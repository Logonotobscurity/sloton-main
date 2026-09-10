/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "marketing-must-not-import-chamfer",
      severity: "error",
      comment: "Chamfer styles and components are showcase-only.",
      from: {
        path: "^src/(app|components)/(?!chamfer)",
        pathNot: "^src/app/chamfer",
      },
      to: {
        path: "chamfer",
      },
    },
    {
      name: "shell-must-use-newsletter-barrel",
      severity: "error",
      comment: "NewsletterPopup must be imported from the components barrel.",
      from: {
        path: "^src/app/layout\\.tsx$|^src/components/chrome-shell\\.tsx$",
      },
      to: {
        path: "newsletter-popup",
      },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
  },
};
