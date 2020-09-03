export interface UserInterface {
  username: string,
  email: string,
  password: string | null,
  profilePhoto: string | null,
  timeCreated: Date,
  googleid: string | null,
  numberOfMails: number,
  oauth: boolean,
  verified: boolean
}

export interface MailTokenInterface {
  link: string,
  token:string
}