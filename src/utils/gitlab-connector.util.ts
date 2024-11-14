import axios from "axios";
import { AppConfig } from "../config";
import { PackageJsonType } from "../types";
import { logger } from "./logger.util";

const api = axios.create({
  baseURL: AppConfig.baseUrlGitlab,
  headers: { Authorization: `Bearer ${AppConfig.gitlabToken}` },
});

export async function fetchPackageJson(projectId: string): Promise<PackageJsonType | null> {
  try {
    const response = await api({
      url: `api/v4/projects/${projectId}/repository/files/package.json/raw`,
      method: "GET",
      params: { ref: "main" },
    });

    return response.data && typeof response.data !== "object" ? JSON.parse(response.data) : response.data;
  } catch (error) {
    logger.error(`${error}`);
    return null;
  }
}
