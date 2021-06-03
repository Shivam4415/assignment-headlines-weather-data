import _ from "lodash";

const isDefined = (x: any) => !_.isUndefined(x);
const isNotEmpty = (x: any) => !_.isEmpty(x);
const isNotNull = (x: any) => x != null;
const isDefinedAndNotNull = (x: any) => isDefined(x) && isNotNull(x);
const isDefinedAndNotNullAndNotEmpty = (x: any) =>
  isDefined(x) && isNotNull(x) && isNotEmpty(x);
const removeUndefinedValues = (obj: any) => _.pickBy(obj, isDefined);
const removeNullValues = (obj: any) => _.pickBy(obj, isNotNull);
const removeUndefinedAndNullValues = (obj: any) =>
  _.pickBy(obj, isDefinedAndNotNull);
const removeUndefinedAndNullAndEmptyValues = (obj: any) =>
  _.pickBy(obj, isDefinedAndNotNullAndNotEmpty);
const isBlank = (value: any) => _.isEmpty(_.toString(value));

export {
  isDefined,
  isNotEmpty,
  isNotNull,
  isDefinedAndNotNull,
  isDefinedAndNotNullAndNotEmpty,
  removeUndefinedValues,
  removeNullValues,
  removeUndefinedAndNullValues,
  removeUndefinedAndNullAndEmptyValues,
  isBlank,
};
