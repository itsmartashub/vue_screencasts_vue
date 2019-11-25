let required = (propertyType) => {
	return val => val && val.length > 0 || `You must input a ${propertyType}`
}

let minLength = (propertyType, minLength) => {
	return val => val && val.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}

let maxLength = (propertyType, maxLength) => {
	return val => val && val.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

let emailFormat = () => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  return val => val && regex.test(val) || "Must be a valid email"
}

export default {
	required,
	minLength,
	maxLength,
	emailFormat
}