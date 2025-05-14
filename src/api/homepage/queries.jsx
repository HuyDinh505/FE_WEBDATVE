import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getChiTietPhimAPI,
  getDSGHEAPI,
  getDVAnUongAPI,
  getLoaiVeAPI,
  getPhimAPI,
  getPhongAPI,
  getRapAPI,
  getRapSCAPI,
  postBooKingAPI,
} from "./request";
import { optionsUseQuery } from "../../Utilities/common";
export const useGetPhimUS = (option) => {
  return useQuery({
    queryKey: ["GetPhimAPI"],
    queryFn: getPhimAPI,
    optionsUseQuery,
    ...option,
  });
};

export const useGetChiTietPhimUS = (ma_phim, option) => {
  return useQuery({
    queryKey: ["GetChiTietPhimAPI", ma_phim],
    queryFn: () => getChiTietPhimAPI(ma_phim),
    optionsUseQuery,
    ...option,
  });
};

export const useGetLoaiVeUS = (option) => {
  return useQuery({
    queryKey: ["GetLoaiVeAPI"],
    queryFn: getLoaiVeAPI,
    optionsUseQuery,
    ...option,
  });
};

export const useGetRapSCUS = (ma_phim, option) => {
  return useQuery({
    queryKey: ["GetRapSCAPI", ma_phim],
    queryFn: () => getRapSCAPI(ma_phim),
    optionsUseQuery,
    ...option,
  });
};

export const useGetDSGheUS = (ma_phong, option) => {
  return useQuery({
    queryKey: ["GetDSGheAPI", ma_phong],
    queryFn: () => getDSGHEAPI(ma_phong),
    optionsUseQuery,
    ...option,
  });
};

export const useGetRapUS = (ma_rap, option) => {
  return useQuery({
    queryKey: ["GetRapAPI", ma_rap],
    queryFn: () => getRapAPI(ma_rap),
    optionsUseQuery,
    ...option,
  });
};

export const useGePhongUS = (ma_phong, option) => {
  return useQuery({
    queryKey: ["GetPhongAPI", ma_phong],
    queryFn: () => getPhongAPI(ma_phong),
    optionsUseQuery,
    ...option,
  });
};

export const usePostBookingUS = (option) => {
  return useMutation({
    mutationFn: postBooKingAPI,
    ...option,
  });
};

export const useGetDVAnUongUS = (option) => {
  return useQuery({
    queryKey: ["GetDVAnUongAPI"],
    queryFn: getDVAnUongAPI,
    optionsUseQuery,
    ...option,
  });
};
