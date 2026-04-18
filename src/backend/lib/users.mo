import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/users";

module {
  public func registerOrUpdateProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    _accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    name : Text,
    email : Text,
    role : Types.UserRole,
  ) : Types.UserProfile {
    let profile : Types.UserProfile = {
      principal = caller;
      name = name;
      email = email;
      role = role;
      createdAt = Time.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId);
  };

  public func isAdmin(
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
  ) : Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public func isStudent(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Principal,
  ) : Bool {
    switch (profiles.get(caller)) {
      case (?profile) {
        switch (profile.role) {
          case (#student) true;
          case (_) false;
        };
      };
      case null false;
    };
  };
};
