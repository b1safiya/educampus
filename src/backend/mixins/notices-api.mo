import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/notices";
import NoticesLib "../lib/notices";

mixin (
  accessControlState : AccessControl.AccessControlState,
  notices : List.List<Types.Notice>,
  nextNoticeIdBox : { var value : Nat },
) {
  /// Create a new notice (Admin only).
  public shared ({ caller }) func createNotice(input : Types.NoticeInput) : async Types.Notice {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create notices");
    };
    let notice = NoticesLib.createNotice(notices, nextNoticeIdBox.value, caller, input);
    nextNoticeIdBox.value += 1;
    notice;
  };

  /// Update an existing notice (Admin only).
  public shared ({ caller }) func updateNotice(id : Common.NoticeId, input : Types.NoticeInput) : async ?Types.Notice {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update notices");
    };
    NoticesLib.updateNotice(notices, id, input);
  };

  /// Delete a notice by id (Admin only).
  public shared ({ caller }) func deleteNotice(id : Common.NoticeId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete notices");
    };
    NoticesLib.deleteNotice(notices, id);
  };

  /// Get all notices sorted by createdAt descending.
  public query func getAllNotices() : async [Types.Notice] {
    NoticesLib.getAllNotices(notices);
  };

  /// Search notices by title or description (case-insensitive).
  public query func searchNotices(term : Text) : async [Types.Notice] {
    NoticesLib.searchNotices(notices, term);
  };

  /// Get notices filtered by category.
  public query func getNoticesByCategory(category : Types.NoticeCategory) : async [Types.Notice] {
    NoticesLib.getNoticesByCategory(notices, category);
  };

  /// Get chart stats: count per category and count per day (last 30 days).
  public query func getNoticeStats() : async Types.NoticeStats {
    NoticesLib.getNoticeStats(notices);
  };
};
