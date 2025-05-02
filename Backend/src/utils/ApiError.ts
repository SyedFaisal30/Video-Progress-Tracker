class ApiError extends Error {
    status: number;
    success: boolean;
    data: null;
    errors: any[];
  
    constructor(
      status: number,
      success: boolean,
      message = "Something went wrong",
      errors: any[] = [],
      stack = ""
    ) {
      super(message);
      this.status = status;
      this.success = success;
      this.data = null;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    toJSON() {
      return {
        status: this.status,
        success: this.success,
        message: this.message,
        errors: this.errors,
      };
    }
  }
  
  export { ApiError };
  