import Common "common";

module {
  public type UserRole = { #admin; #student };

  public type UserProfile = {
    principal : Common.UserId;
    name : Text;
    email : Text;
    role : UserRole;
    createdAt : Common.Timestamp;
  };
};
