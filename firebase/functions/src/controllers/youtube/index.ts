import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { ApiResult } from "../../types/api/api-result";
import { DIResolutions } from "../../utils/di-resolution";
import { YouTubePlaylistParamsType } from "../../types/domain/youtube-playlist-params-type";

export const getLatestYouTubeVideos = onRequest(
    { secrets: ["YOUTUBE_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<any> => {
            const ytService = DIResolutions.getYouTubeService();
            return await ytService.getLatestYouTubeVideos(req.body as YouTubePlaylistParamsType);
        }
    )));

export const getAllYouTubeVideos = onRequest(
    { secrets: ["YOUTUBE_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<any> => {
            const ytService = DIResolutions.getYouTubeService();
            return await ytService.getAllYouTubeVideos();
        }
    )));

export const getYouTubeVideoById = onRequest(
    { secrets: ["YOUTUBE_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<any> => {
            const ytService = DIResolutions.getYouTubeService();
            return await ytService.getYouTubeVideoById(req.body as YouTubePlaylistParamsType);
        }
    )));