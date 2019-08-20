const isEmpty = value => value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'object' && value.trim.length === 0);

export default isEmpty;