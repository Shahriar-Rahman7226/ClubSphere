
USER_ROLES = (
    ('SUPER_USER', 'super_user'),
    ('SUPER_ADMIN', 'super_admin'),
    ('ADMIN', 'admin'),
    ('GENERAL', 'general'),
)

GENDER = (
    ('MALE', 'male'),
    ('FEMALE', 'female'),
    ('OTHER', 'other'),
)

BLOOD_GROUPS = (
    ('A+', 'A+'),
    ('A-', 'A-'),
    ('B+', 'B+'),
    ('B-', 'B-'),
    ('AB+', 'AB+'),
    ('AB-', 'AB-'),
    ('O+', 'O+'),
    ('O-', 'O-'),
)

AUDIENCE = (
    ('CLUB_MEMBERS', 'club_members'),
     ('UNIVERSITY', 'university'),
      ('PUBLIC', 'public'),
      ('PRIVATE', 'private'),
)

EVENT_STATUS = (
    ('ONGOING', 'ongoing'),
    ('UPCOMING', 'upcoming'),
    ('COMPLETED', 'completed'),
)

CLUB_POSITIONS = (
    ('PROBATIONARY_MEMBER', 'probationary_member'),
    ('GENERAL_MEMBER', 'general_member'),
    ('SENIOR_MEMBER', 'senior_member'),
    ('SUB_EXECUTIVE_BODY', 'sub_executive_body'),
    ('EXECUTIVE_BODY', 'executive_body'),
)

ADDITIONAL_CLUB_POSITIONS = (
    ('PRESIDENT', 'president'),
    ('VICE_PRESIDENT', 'vice_president'),
    ('TREASURER', 'treasurer'),
    ('JOINT_SECRETARY', 'joint_secretary'),
    ('GENERAL_SECRETARY', 'general_secretary'),
)

MEMBERSHIP_STATUS = (
    ('CURRENT', 'current'),
    ('FORMER', 'former'),
    ('REJECTED', 'rejected'),
    ('PENDING', 'pending'),
)