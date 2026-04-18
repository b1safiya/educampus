import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import UserTypes "types/users";
import NoticeTypes "types/notices";
import UsersMixin "mixins/users-api";
import NoticesMixin "mixins/notices-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  include UsersMixin(accessControlState, userProfiles);

  let notices = List.empty<NoticeTypes.Notice>();
  let nextNoticeIdBox = { var value : Nat = 0 };
  include NoticesMixin(accessControlState, notices, nextNoticeIdBox);

  // Pre-populate sample data on first deploy
  var sampleDataSeeded : Bool = false;

  func seedSampleData() {
    if (sampleDataSeeded) return;
    sampleDataSeeded := true;

    let sampleNotices : [(Text, NoticeTypes.NoticeCategory, Text, ?Text, Text)] = [
      (
        "Welcome to EduCampus Portal",
        #Announcement,
        "Welcome to the EduCampus Smart Notice Board. This portal keeps you informed about all campus activities, assignments, and important alerts.",
        null,
        "2026-04-01",
      ),
      (
        "Mid-Term Examination Schedule Released",
        #Announcement,
        "The mid-term examination schedule for April 2026 has been released. Please check your department's timetable and prepare accordingly.",
        ?"https://example.com/midterm-schedule.pdf",
        "2026-04-03",
      ),
      (
        "Annual Sports Day - April 20",
        #Event,
        "The Annual Sports Day will be held on April 20, 2026 at the main campus ground. All students are encouraged to participate in track events, team sports, and field games.",
        null,
        "2026-04-05",
      ),
      (
        "Computer Science Assignment #3 Due",
        #Assignment,
        "Assignment #3 for CS301 - Data Structures is due on April 25, 2026. Submit via the student portal before 11:59 PM. Late submissions will not be accepted.",
        ?"https://example.com/cs301-assignment3.pdf",
        "2026-04-07",
      ),
      (
        "Library Closed for Renovation",
        #Alert,
        "The main campus library will be closed from April 18-22, 2026 for scheduled renovation work. Digital resources remain accessible via the online portal.",
        null,
        "2026-04-10",
      ),
      (
        "Guest Lecture: Artificial Intelligence in Healthcare",
        #Event,
        "Join us for a guest lecture by Dr. Sarah Chen on AI Applications in Modern Healthcare on April 22, 2026 at 3:00 PM in Auditorium B.",
        null,
        "2026-04-12",
      ),
      (
        "Mathematics Project Submission Reminder",
        #Assignment,
        "Final project submissions for MATH201 - Linear Algebra are due April 28, 2026. Groups of 3-4 students must submit a written report and presentation slides.",
        ?"https://example.com/math201-project-guidelines.pdf",
        "2026-04-14",
      ),
      (
        "Campus Wi-Fi Maintenance - April 19",
        #Alert,
        "Scheduled network maintenance will cause intermittent Wi-Fi outages across campus on April 19, 2026 between 2:00 AM and 6:00 AM. Plan accordingly.",
        null,
        "2026-04-16",
      ),
    ];

    let systemPrincipal = Principal.fromText("aaaaa-aa");
    let oneDayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let baseTime : Int = Time.now() - (8 * oneDayNs);

    var i : Int = 0;
    for ((title, category, description, fileLink, date) in sampleNotices.values()) {
      let notice : NoticeTypes.Notice = {
        id = nextNoticeIdBox.value;
        title = title;
        category = category;
        description = description;
        fileLink = fileLink;
        date = date;
        createdAt = baseTime + (i * oneDayNs);
        authorId = systemPrincipal;
      };
      notices.add(notice);
      nextNoticeIdBox.value += 1;
      i += 1;
    };
  };

  seedSampleData();
};
