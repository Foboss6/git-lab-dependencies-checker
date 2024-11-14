import * as dotenv from "dotenv";
import packagesToFind from "../packages-to-find.json";
import projectsToCheck from "../projects-to-check.json";
import { logger } from "./utils/logger.util";

dotenv.config();

class Config {
  baseUrlGitlab = process.env.GITLAB_API_URL;
  gitlabToken = process.env.GITLAB_TOKEN;

  projectsToCheck = projectsToCheck ?? [];
  packagesToFind = packagesToFind ?? [];

  constructor() {
    if (!this.baseUrlGitlab) {
      logger.error(`The "GITLAB_API_URL" ENV must be set and contain a URL address of the GitLab server`);
      process.exit();
    }

    if (!this.gitlabToken) {
      logger.error(`The "GITLAB_API_URL" ENV must be set and contain a valid GitLab API Token`);
      process.exit();
    }

    if (!this.projectsToCheck.length) {
      logger.error(`There are no projects to check`);
      process.exit();
    }

    if (!this.packagesToFind.length) {
      logger.error(`There are no packages to check`);
      process.exit();
    }
  }
}

export const AppConfig = new Config();
