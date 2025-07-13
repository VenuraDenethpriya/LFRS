import express, { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

export const buildLostReportQuery = (params: any) => {
    const query: any = {};
    if (params.referance) query.referanceNo = params.referance;
    if (params.category) query.category = { $in: [params.category] };
    if (params.location) query.location = params.location;
    if (params.policeStation) query.nearestPoliceStation = params.policeStation;
    if (params.district) query.district = params.district;
    if (params.date) query.dateOfLost = new Date(params.date);
    return query;
};
