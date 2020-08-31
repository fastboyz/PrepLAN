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
  contract.name = data.name;
  contract.maximumMinutesPerDay = data.maximumMinutesPerDay;
  try {
    const response = await axios.post(`${SCHEDULER}/tenant/${tenantId}/contract/add`, contract);
    return response.data;
  } catch (error) {
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

const createShiftInScheduler = async (data) => {
  var shift = {
    tenantId: null,
    pinnedByUser: false,
    spotId: null,
    requiredSkillSetIdList: [],
    employeeId: null,
    originalEmployeeId: null,
    rotationEmployeeId: null,
    startDateTime: null,
    endDateTime: null
  }

  shift.tenantId = data.edition.tenantId;
  shift.spotId = data.position.spotId;
  shift.startDateTime = moment(data.startDateTime).format('YYYY-MM-DDTHH:mm');
  shift.endDateTime = moment(data.endDateTime).format('YYYY-MM-DDTHH:mm');
  try {
    const response = await axios.post(`${SCHEDULER}/tenant/${data.edition.tenantId}/shift/add`, shift);
    const picked = (({ id, tenantId, spotId, employeeId, startDateTime, endDateTime }) =>
      ({ id, tenantId, spotId, employeeId, startDateTime, endDateTime }))(response.data);
    return picked;
  } catch (error) {
    return false;
  }
};

const updateShiftInScheduler = async (data) => {
  var shift = {
    id: data.shiftId,
    tenantId: data.edition.tenantId,
    pinnedByUser: false,
    spotId: data.position.spotId,
    requiredSkillSetIdList: [],
    employeeId: data.volunteerId,
    originalEmployeeId: null,
    rotationEmployeeId: null,
    startDateTime: data.startDateTime,
    endDateTime: data.endDateTime
  }

  try {
    const response = await axios.put(`${SCHEDULER}/tenant/${data.edition.tenantId}/shift/update`, shift);
    const picked = (({ id, tenantId, spotId, employeeId, startDateTime, endDateTime }) =>
      ({ id, tenantId, spotId, employeeId, startDateTime, endDateTime }))(response.data);
    picked['volunteerId'] = response.data.employeeId;
    return picked;
  } catch (error) {
    return false;
  }
};

const deleteShiftInScheduler = async (data) => {
  try {
    const response = await axios.delete(`${SCHEDULER}/tenant/${data.edition.tenantId}/shift/${data.shiftId}`);
    return response.data;
  } catch (error) {
    return false;
  }
};

const addVolunteerInScheduler = async (data) => {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16)
  var volunteer = {
    skillProficiencySet: [],
    color: `#${randomColor}`,
    name: `${data.profile.user.firstName} ${data.profile.user.lastName}`,
    shortId: `${data.profile.user.firstName.charAt(0)}${data.profile.user.lastName.charAt(0)}`,
    contract: {
      id: data.contract.contractId,
      tenantId: data.edition.tenantId,
      version: 0,
      name: data.contract.name,
      maximumMinutesPerDay: data.contract.maximumMinutesPerDay,
      maximumMinutesPerWeek: null,
      maximumMinutesPerMonth: null,
      maximumMinutesPerYear: null
    },
    tenantId: data.edition.tenantId,
    version: 0
  }
  data.positions.forEach(element => {
    var skill = {
      id: element.skillId,
      tenantId: data.edition.tenantId,
      version: 0,
      name: element.title
    };
    volunteer.skillProficiencySet.push(skill);
  });

  try {
    const response = await axios.post(`${SCHEDULER}/tenant/${data.edition.tenantId}/employee/add`, volunteer);
    return response.data;
  } catch (error) {
    return false;
  }
};

const deleteVolunteerInScheduler = async (data) => {
  try {
    const response = await axios.delete(`${SCHEDULER}/tenant/${data.edition.tenantId}/employee/${data.volunteerId}`);
    return response.data;
  } catch (error) {
    return false;
  }
};

const updateVolunteerInScheduler = async (data) => { };

const addAvailabilityInScheduler = async (data, volunteerId, tenantId) => {
  data.startDateTime = moment(data.startDateTime).format('YYYY-MM-DDTHH:mm');
  data.endDateTime = moment(data.endDateTime).format('YYYY-MM-DDTHH:mm');
  const picked = (({ startDateTime, endDateTime, state }) => ({ startDateTime, endDateTime, state }))(data);
  picked['tenantId'] = tenantId;
  picked['employeeId'] = volunteerId;
  try {
    const response = await axios.post(`${SCHEDULER}/tenant/${tenantId}/employee/availability/add`, picked);
    return response.data;
  } catch (error) {
    return false;
  }
};

const deleteAvailabilityInScheduler = async (data) => {
  try {
    const response = await axios.delete(`${SCHEDULER}/tenant/${data.tenantId}/employee/availability/${data.availabilityId}`);
    return response.data;
  } catch (error) {
    return false;
  }
};

const updateAvailabilityInScheduler = async (data) => {
  var availability = {
    tenantId: data.tenantId,
    state: data.state,
    employeeId: data.volunteerId,
    startDateTime: moment(data.startDateTime).format('YYYY-MM-DDTHH:mm'),
    endDateTime: moment(data.endDateTime).format('YYYY-MM-DDTHH:mm')
  };

  try {
    const response = await axios.put(`${SCHEDULER}/tenant/${tenantId}/employee/availability/update`, availability);
    return response.data;
  } catch (error) {
    return false;
  }
};

const startSolving = async (tenantId) => {
  try {
    await axios.put(`${SCHEDULER}/tenant/${tenantId}/roster/solve`);
    return true;
  } catch (error) {
    return false;
  }
}

const stopSolving = async (tenantId) => {
  try {
    await axios.put(`${SCHEDULER}/tenant/${tenantId}/roster/terminate`);
    return true;
  } catch (error) {
    return false;
  }
}

const getExcel = async (tenantId, startDate, endDate, spotList) => {
  try {
    const response = await axios.put(`${SCHEDULER}/tenant/${tenantId}/roster/shiftRosterView/excel?endDate=${endDate}&spotList=${spotList}&startDate=${startDate}`);
    return response.data;
  } catch (error) {
    return false;
  }
}

const getStatus = async (tenantId) => {
  try {
    const response = await axios.get(`${SCHEDULER}/tenant/${tenantId}/roster/status`);
    return response.data;
  } catch (error) {
    return false;
  }
}


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
  createShiftInScheduler,
  updateShiftInScheduler,
  deleteShiftInScheduler,
  startSolving, 
  stopSolving, 
  getExcel,
  getStatus
};
