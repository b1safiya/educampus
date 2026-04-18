import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Common "../types/common";
import Types "../types/notices";

module {
  public func createNotice(
    notices : List.List<Types.Notice>,
    nextId : Nat,
    caller : Principal,
    input : Types.NoticeInput,
  ) : Types.Notice {
    let notice : Types.Notice = {
      id = nextId;
      title = input.title;
      category = input.category;
      description = input.description;
      fileLink = input.fileLink;
      date = input.date;
      createdAt = Time.now();
      authorId = caller;
    };
    notices.add(notice);
    notice;
  };

  public func updateNotice(
    notices : List.List<Types.Notice>,
    id : Common.NoticeId,
    input : Types.NoticeInput,
  ) : ?Types.Notice {
    var updated : ?Types.Notice = null;
    notices.mapInPlace(
      func(n) {
        if (n.id == id) {
          let u : Types.Notice = {
            n with
            title = input.title;
            category = input.category;
            description = input.description;
            fileLink = input.fileLink;
            date = input.date;
          };
          updated := ?u;
          u;
        } else {
          n;
        };
      }
    );
    updated;
  };

  public func deleteNotice(
    notices : List.List<Types.Notice>,
    id : Common.NoticeId,
  ) : Bool {
    let sizeBefore = notices.size();
    let filtered = notices.filter(func(n : Types.Notice) : Bool { n.id != id });
    notices.clear();
    notices.append(filtered);
    notices.size() < sizeBefore;
  };

  public func getAllNotices(
    notices : List.List<Types.Notice>,
  ) : [Types.Notice] {
    let arr = notices.toArray();
    arr.sort(func(a : Types.Notice, b : Types.Notice) : Order.Order { Int.compare(b.createdAt, a.createdAt) });
  };

  public func searchNotices(
    notices : List.List<Types.Notice>,
    term : Text,
  ) : [Types.Notice] {
    let lowerTerm = term.toLower();
    let arr = notices.toArray();
    let filtered = arr.filter(func(n : Types.Notice) : Bool {
      n.title.toLower().contains(#text lowerTerm) or
      n.description.toLower().contains(#text lowerTerm)
    });
    filtered.sort(func(a : Types.Notice, b : Types.Notice) : Order.Order { Int.compare(b.createdAt, a.createdAt) });
  };

  public func getNoticesByCategory(
    notices : List.List<Types.Notice>,
    category : Types.NoticeCategory,
  ) : [Types.Notice] {
    let arr = notices.toArray();
    let filtered = arr.filter(func(n : Types.Notice) : Bool {
      n.category == category
    });
    filtered.sort(func(a : Types.Notice, b : Types.Notice) : Order.Order { Int.compare(b.createdAt, a.createdAt) });
  };

  public func getNoticeStats(
    notices : List.List<Types.Notice>,
  ) : Types.NoticeStats {
    let allCategories : [Types.NoticeCategory] = [#Announcement, #Event, #Assignment, #Alert];

    // Count per category
    let perCategory = allCategories.map(
      func(cat) {
        let count = notices.foldLeft(
          0,
          func(acc : Nat, n : Types.Notice) : Nat {
            if (n.category == cat) { acc + 1 } else { acc }
          },
        );
        ({ category = cat; count = count } : Types.CategoryStat);
      }
    );

    // Count per day for last 30 days using a Map
    let dayMap = Map.empty<Text, Nat>();
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let cutoff = Time.now() - thirtyDaysNs;

    notices.forEach(func(n : Types.Notice) {
      if (n.createdAt >= cutoff) {
        let dateKey = n.date;
        let existing = switch (dayMap.get(dateKey)) {
          case (?c) c;
          case null 0;
        };
        dayMap.add(dateKey, existing + 1);
      };
    });

    let dayEntries = dayMap.toArray();
    let dayStats = dayEntries.map(
      func(entry : (Text, Nat)) : Types.DayStat {
        ({ date = entry.0; count = entry.1 } : Types.DayStat)
      }
    );
    let perDay = dayStats.sort(func(a : Types.DayStat, b : Types.DayStat) : Order.Order { Text.compare(a.date, b.date) });

    { perCategory = perCategory; perDay = perDay };
  };
};
