import moment from "moment-timezone";
import axios from "axios";
import { SCHEDULER } from "../config";

const createTenantInScheduler = async (edition) => {
  var tenant = {};
  tenant["publishLength"] = 7;
  tenant["unplannedRotationOffset"] = 0;
  tenant["tenant"] = {
    name: `${edition.event.title}_${edition.name}`,
  };
  tenant["publishNotice"] = 1;

  var startDate = moment(edition.startDate);
  var endDate = moment(edition.endDate);
  startDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  endDate.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  tenant["draftLength"] = endDate.diff(startDate, "days") + 1;
  tenant["rotationLength"] = endDate.diff(startDate, "days") + 1;

  var offset = startDate.utcOffset();
  moment.tz.names().forEach((element) => {
    if (
      moment.tz(element).utcOffset() === offset &&
      element.startsWith("Etc")
    ) {
      tenant["timeZone"] = element;
    }
  });

  tenant["firstDraftDate"] = startDate.toISOString();
  var lastHistoricDate = startDate.subtract(1, "days");
  tenant["lastHistoricDate"] = lastHistoricDate.toISOString();
  console.log(JSON.stringify(tenant));

  try {
    const response = await axios.post(`${SCHEDULER}/tenant/add`, tenant);
    return response.data;
  } catch (error) {
    return false;
  }
};

const deleteTenantInScheduler = async (edition) => {
  try {
    const response = await axios.post(
      `${SCHEDULER}/tenant/remove/${edition.tenantId}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

const createSkillAndSpot = async (position) => {
  var skill = {};
  var spot = {};
  var tenantId = position.edition.tenantId;

  skill["name"] = position.title;
  skill["tenantId"] = tenantId;
  const createdSKill = await axios
    .post(`${SCHEDULER}/tenant/${tenantId}/skill/add`, skill)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  spot["name"] = position.title;
  spot["tenantId"] = tenantId;
  spot["requiredSkillSet"] = [createdSKill];
  try {
    const res_1 = await axios.post(
      `${SCHEDULER}/tenant/${tenantId}/spot/add`,
      spot
    );
    return {
      skill: createdSKill,
      spot: res_1.data,
    };
  } catch (error_1) {
    return false;
  }
};

const updateSkillAndSpot = async (position) => {
  var skill = {};
  var spot = {};
  var tenantId = position.edition.tenantId;

  skill["name"] = position.title;
  skill["tenantId"] = tenantId;
  skill["id"] = position.skillId;
  const updatedSKill = await axios
    .post(`${SCHEDULER}/tenant/${tenantId}/skill/update`, skill)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });

  spot["name"] = position.title;
  spot["tenantId"] = tenantId;
  spot["requiredSkillSet"] = [updatedSKill];
  spot["id"] = position.spotId;
  try {
    const updatedSpot = await axios.post(
      `${SCHEDULER}/tenant/${tenantId}/spot/update`,
      spot
    );
    return {
      skill: updatedSKill,
      spot: updatedSpot.data,
    };
  } catch (error_1) {
    return false;
  }
};

const deleteSkillAndSpot = async (position) => {
  var tenantId = position.edition.tenantId;
  const deletedSkill = await axios.delete(`${SCHEDULER}/tenant/${tenantId}/skill/${position.skillId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });

  try {
    const res_1 = await axios.delete(`${SCHEDULER}/tenant/${tenantId}/spot/${position.spotId}`);
    return { skill: deletedSkill, spot: res_1.data };
  }
  catch (error_1) {
    return false;
  }
};

const createContract = async (data) => {
  var tenantId = data.edition.tenantId;
  var contract = {
    maximumMinutesPerDay: 0,
    maximumMinutesPerMonth: null,
    maximumMinutesPerWeek: null,
    maximumMinutesPerYear: null,
    name: "string",
    tenantId: 0,
  };
  contract.tenantId = data.edition.tenantId;
  contract.name = data.contract.name;
  contract.maximumMinutesPerDay = data.contract.maximumMinutesPerDay;

  try {
    const response = await axios.post(`${SCHEDULER}/tenant/${tenantId}/contract/add`, contract);
    return response.data;
  } catch (error) {
    console.log(error)
    return false;
  }
};

const updateContract = async (data) => {
  var tenantId = data.edition.tenantId;
  var contract = {
    id: 0,
    maximumMinutesPerDay: 0,
    maximumMinutesPerMonth: null,
    maximumMinutesPerWeek: null,
    maximumMinutesPerYear: null,
    name: "string",
    tenantId: 0,
  };
  contract.id = data.contractId;
  contract.tenantId = data.edition.tenantId;
  contract.name = data.name;
  contract.maximumMinutesPerDay = data.maximumMinutesPerDay;

  try {
    const response = await axios.post(`${SCHEDULER}/tenant/${tenantId}/contract/update`, contract);
    return response.data;
  } catch (error) {
    return false;
  }
};

const deleteContract = async (data) => {
  var tenantId = data.edition.tenantId;
  try {
    const response = await axios.delete(`${SCHEDULER}/tenant/${tenantId}/contract/${data.contractId}`);
    return response.data;
  } catch (error) {
    return false;
  }
};

const addVolunteerInScheduler = async (data) => {

};

const deleteVolunteerInScheduler = async (data) => { };

const updateVolunteerInScheduler = async (data) => { };

const addAvailabilityInScheduler = async (data) => { };

const deleteAvailabilityInScheduler = async (data) => { };

const updateAvailabilityInScheduler = async (data) => { };

export {
  addAvailabilityInScheduler,
  addVolunteerInScheduler,
  createContract,
  createSkillAndSpot,
  createTenantInScheduler,
  deleteAvailabilityInScheduler,
  deleteContract,
  deleteSkillAndSpot,
  deleteTenantInScheduler,
  deleteVolunteerInScheduler,
  updateAvailabilityInScheduler,
  updateContract,
  updateSkillAndSpot,
  updateVolunteerInScheduler,
};
