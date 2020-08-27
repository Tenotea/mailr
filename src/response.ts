export class ErrorResponse{
  private type:string
  private isVerified:boolean
  private msg:string
  private action:string
  constructor(isVerified:boolean, msg:string, action:string){
    this.type = 'error'
    this.isVerified = isVerified
    this.msg = msg
    this.action = action
  }
}


export class SuccessResponse {
  private type:string
  private isVerified:boolean
  private content:object

  constructor(isverified:boolean, content:object){
    this.type = 'success'
    this.isVerified = isverified
    this.content = content
  }
}