import { NezhaAPISafe } from "../app/[locale]/types/nezha-api";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNezhaInfo(serverInfo: NezhaAPISafe) {
  return {
    ...serverInfo,
    cpu: serverInfo.status.CPU,
    up: serverInfo.status.NetOutSpeed / 1024 / 1024,
    down: serverInfo.status.NetInSpeed / 1024 / 1024,
    online: serverInfo.online_status,
    mem: (serverInfo.status.MemUsed / serverInfo.host.MemTotal) * 100,
    stg: (serverInfo.status.DiskUsed / serverInfo.host.DiskTotal) * 100,
    country_code: serverInfo.host.CountryCode,
  };
}

export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getDaysBetweenDates(date1: string, date2: string): number {
  const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  // 计算两个日期之间的天数差异
  return Math.round(
    Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
  );
}

export const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => data.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });

export const nezhaFetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw err;
    });

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes >= 0) {
    return `${minutes}分钟前`;
  } else {
    return "刚刚";
  }
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
