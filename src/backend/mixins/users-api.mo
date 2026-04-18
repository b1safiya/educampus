import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/users";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Common.UserId, Types.UserProfile>,
) {
  /// Register or update the caller's user profile.
  public shared ({ caller }) func registerUserProfile(name : Text, email : Text, role : Types.UserRole) : async Types.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in to register");
    };
    UsersLib.registerOrUpdateProfile(userProfiles, accessControlState, caller, name, email, role);
  };

  /// Get the caller's own profile.
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    if (caller.isAnonymous()) {
      return null;
    };
    UsersLib.getProfile(userProfiles, caller);
  };

  /// Save the caller's profile (used by authorization extension).
  public shared ({ caller }) func saveCallerUserProfile(profile : Types.UserProfile) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    userProfiles.add(caller, profile);
  };

  /// Get any user's profile by principal.
  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?Types.UserProfile {
    UsersLib.getProfile(userProfiles, userId);
  };

  /// Check if caller has admin role.
  public query ({ caller }) func isAdmin() : async Bool {
    UsersLib.isAdmin(accessControlState, caller);
  };

  /// Check if caller has student role.
  public query ({ caller }) func isStudent() : async Bool {
    UsersLib.isStudent(userProfiles, caller);
  };
};
