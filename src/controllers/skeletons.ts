import { hashSync } from "bcryptjs"
import { UserInterface } from './interface'

 export class UserSkeleton {
  private username:string
  private email:string
  private password:string | null
  private profilePhoto:string | null
  private timeCreated:Date
  private googleid:string | null
  private numberOfMails:number
  private oauth:boolean
  private verified:boolean

  constructor(username:string, email:string, password:string | null, profilePhoto:string | null, googleid:string | null, oauth:boolean){
    this.username = username
    this.email = email
    this.password = oauth ? null : password
    this.profilePhoto = profilePhoto ? profilePhoto : null
    this.timeCreated = new Date(Date.now())
    this.googleid = oauth ? googleid : null
    this.numberOfMails = 0
    this.oauth = oauth,
    this.verified = oauth ? true : false
  }

  public hashPassword():void{
    this.password = this.password ? hashSync(this.password, 10) : null
  }

  public getUsername():string {
    return this.username
  }

  public getEmail():string {
    return this.username
  }
}

export const responseUserSkeleton = (user:UserInterface) => {
  return {
    username: user.username,
    email: user.email,
    profilePhoto: user.profilePhoto,
    timeCreated: user.timeCreated,
    numberOfMails: user.numberOfMails,
    verified: user.verified
  }
}