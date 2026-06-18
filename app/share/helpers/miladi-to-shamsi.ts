import moment from "moment-jalaali";

export const miladiToShamsi = (date: string) => {
  return moment(date).format("jYYYY/jMM/jDD");
};
