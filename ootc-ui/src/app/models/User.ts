export class User {
  id: string;
  email: string;
  fname: string;
  mname: string;
  lname: string;
  phone: number;
  age: number;
  experience: number;
  comments: string;
  isValidated: boolean; // Check this type pls
  isAdmin: boolean;

  constructor
    (
      id: string,
      email: string,
      fname: string,
      mname: string,
      lname: string,
      phone: number,
      age: number,
      experience: number,
      comments: string
    )
    {
     this.id = id,
     this.email = email,
     this.fname = fname,
     this.mname = mname,
     this.lname = lname,
     this.phone = phone,
     this.age = age,
     this.experience = experience,
     this.comments = comments
  }
}
