import moment from "moment";

const getDaysAgo = (date: any = new Date()) => {
  return moment(date).fromNow();
};

export default getDaysAgo;
