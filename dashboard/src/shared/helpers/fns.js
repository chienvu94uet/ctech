import { format } from "date-fns";

export const formatDate = (date = new Date(), formatString = "yyyy-MM-dd") =>
  format(date, formatString);
