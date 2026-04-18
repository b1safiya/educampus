import Common "common";

module {
  public type NoticeCategory = {
    #Announcement;
    #Event;
    #Assignment;
    #Alert;
  };

  public type Notice = {
    id : Common.NoticeId;
    title : Text;
    category : NoticeCategory;
    description : Text;
    fileLink : ?Text;
    date : Text;
    createdAt : Common.Timestamp;
    authorId : Common.UserId;
  };

  public type NoticeInput = {
    title : Text;
    category : NoticeCategory;
    description : Text;
    fileLink : ?Text;
    date : Text;
  };

  public type CategoryStat = {
    category : NoticeCategory;
    count : Nat;
  };

  public type DayStat = {
    date : Text;
    count : Nat;
  };

  public type NoticeStats = {
    perCategory : [CategoryStat];
    perDay : [DayStat];
  };
};
