import { playInterval } from "../support/helpers";
import elements from "../support/elements";

describe("Charts", () => {
  before("loadApp", () => {
    cy.loadApp();
  });
  beforeEach("show gsp chart", () => {
    // open GSPF if cloesd
    cy.get(elements.GSPFChart)
      .should((_) => {})
      .then(($el) => {
        if (!$el.length) {
          cy.get(elements.map).click(300, 400);
          return;
        }
        return;
      });
  });

  describe("National Forecast Header", () => {
    it("should have correct title", () => {
      cy.get(elements.NFActualPv).should("contain", "7.210");
      cy.get(elements.NFNextForecastPv).should("contain", "6.615");
      cy.get(elements.NFSelectedForecastPv).should("contain", "6.764");
    });
  });
  describe("GSPF Chart", () => {
    it("should be visible", () => {
      cy.get(elements.GSPFChart).should("be.visible");
    });
    it("should have correct headers values", () => {
      cy.get(elements.GSPFPvValues).should("have.text", "64% | 16 / 25MW");
    });
    it("should look correct", () => {
      cy.get(elements.GSPFChart)
        .scrollIntoView()
        .wait(1000)
        .toMatchImageSnapshot({ name: "gspf-chart" });
    });

    it("close button should close the chart", () => {
      cy.get(elements.GSPFCloseBtn).click();
      cy.get(elements.GSPFChart).should("not.exist");
    });
  });
  describe.only("play/pause/reset button", () => {
    beforeEach("reset time", () => {
      cy.get(elements.pauseButton)
        .should((_) => {})
        .then(($el) => {
          if ($el.length) {
            $el.trigger("click");
          }
          return;
        });
      cy.get(elements.resetTimeButton).click();
    });
    // putting in a separate describe block to avoid clock hell
    describe.only("play", () => {
      it("hit play button and time should change", function () {
        cy.window().then((win) => {
          const now = win.window.Date.now();

          if (this.clock) this.clock.restore();
          cy.clock(now);

          cy.get(elements.playButton).click();
          cy.tick(playInterval);
          cy.checkIfTimeUpdatedInUi(now, 30);
        });
      });
    });
    describe.only("pause", () => {
      it("hit pause button and time should not change", function () {
        cy.window().then((win) => {
          const now = win.window.Date.now();
          if (this.clock) this.clock.restore();
          cy.clock(now);

          // play first
          cy.get(elements.playButton).click();
          cy.tick(playInterval);

          //hit pause button
          cy.get(elements.pauseButton).click();
          // pass sometime
          cy.tick(playInterval * 4);

          cy.checkIfTimeUpdatedInUi(now, 30);
        });
      });
    });
    describe.only("reset", () => {
      it(" reset button should reset time", function () {
        cy.window().then((win) => {
          const now = win.window.Date.now();
          if (this.clock) this.clock.restore();
          cy.clock(now);

          // play first
          cy.get(elements.playButton).click();
          cy.tick(playInterval);
          cy.checkIfTimeUpdatedInUi(now, 30);

          cy.get(elements.resetTimeButton).click();
          cy.checkIfTimeUpdatedInUi(now);
        });
      });
    });
  });
  describe("hot keys", () => {
    it("should control time with left and right keys", () => {
      cy.window().then((win) => {
        const now = win.window.Date.now();
        cy.get("body").type("{rightarrow}");
        cy.checkIfTimeUpdatedInUi(now, 30);
        cy.get("body").type("{leftarrow}");
        cy.checkIfTimeUpdatedInUi(now);
      });
    });
    // enable when bug fix is merged
    it.skip("should not go out of range", function () {
      cy.window().then((win) => {
        const lastchartTime = "2022-07-07T22:30:00+00:00";
        cy.get("body")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}")
          .type("{rightarrow}");
        cy.checkIfTimeUpdatedInUi(new Date(lastchartTime).getTime());
      });
    });
  });
});
