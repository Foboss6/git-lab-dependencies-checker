import { AppConfig } from "./config";
import { fetchPackageJson } from "./utils/gitlab-connector.util";
import { logger } from "./utils/logger.util";

(async function () {
  const { projectsToCheck, packagesToFind } = AppConfig;
  const total = { hits: 0, projects: 0 };

  logger.info(
    `We are about to check ${projectsToCheck.length} projects to find ${packagesToFind.length} dependencies. Grab a coffee, take a sit, and relax ☕️`
  );

  for (const { id, name } of projectsToCheck) {
    logger.info(`Checking the project '${name}'`);

    const packageJson = await fetchPackageJson(id);

    if (packageJson?.dependencies) {
      const hits: Record<string, string> = {};

      for (const { name, version } of packagesToFind) {
        if (packageJson.dependencies[name] === version) {
          hits[name] = version;
          total.hits++;
        }
      }

      if (Object.keys(hits).length) {
        total.projects++;

        logger.warn(
          `Found ${Object.keys(hits).length} matches in "${name}" project:\n - ${Object.entries(hits)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n - ")}`
        );
      }
    }
  }

  logger.success(
    `Successfully finished dependencies checking.${
      total.hits ? ` Found ${total.hits} matches across ${total.projects} projects.` : ""
    }`
  );
})();
