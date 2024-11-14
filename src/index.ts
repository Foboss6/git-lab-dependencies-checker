import { AppConfig } from "./config";
import { fetchPackageJson } from "./utils/gitlab-connector.util";
import { logger } from "./utils/logger.util";

(async function () {
  for (const { id, name } of AppConfig.projectsToCheck) {
    logger.info(`Checking the project '${name}'`);

    const packageJson = await fetchPackageJson(id);

    if (packageJson?.dependencies) {
      const hits: Record<string, string> = {};

      for (const { name, version } of AppConfig.packagesToFind) {
        if (packageJson.dependencies[name] === version) {
          hits[name] = version;
        }
      }

      if (Object.keys(hits)) logger.warn(`Found ${Object.keys(hits).length} matches:\n`);
    }
  }

  logger.success(`Successfully finished dependencies checking.`);
})();
