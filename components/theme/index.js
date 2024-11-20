// globalFunctions.js

import { getAccount } from "@/app/services/axios";

export const settingsProvider = async (id) => {
  try {
    const settingsData = await getAccount(id);
    return JSON.parse(settingsData?.message?.settings.setting);
    //return settingsData;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};
