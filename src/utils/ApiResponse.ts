class ApiResponse<T> {
    status: number;
    data: T;
    message: string;
  
    constructor(status: number, data: T, message = "Success") {
      this.status = status;
      this.data = data;
      this.message = message;
    }
  }
  
  export { ApiResponse };
  