module.exports = {
    normalizeErrors: (errors) => {
      let normalizeErrors = [];
  
      // Avoid logging inherited properties
      for (let property in errors) {
        // Returns a boolean indicating whether the object has the specified property
        if (errors.hasOwnProperty(property)) {
          normalizeErrors.push({title: property, detail: errors[property].message});
        }
      }
  
      return normalizeErrors;
    }
  }