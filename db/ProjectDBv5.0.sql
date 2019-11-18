DROP TABLE IF EXISTS "public"."adminpush";
DROP TABLE IF EXISTS "public"."listwork";
DROP TABLE IF EXISTS "public"."projectlist";
DROP TABLE IF EXISTS "public"."projecthint";
DROP TABLE IF EXISTS "public"."teammember";
DROP TABLE IF EXISTS "public"."workhint";
DROP TABLE IF EXISTS "public"."list";
DROP TABLE IF EXISTS "public"."projectpermission";
DROP TABLE IF EXISTS "public"."project";
DROP TABLE IF EXISTS "public"."work";
DROP TABLE IF EXISTS "public"."member";

-- ----------------------------
-- Sequence structure for adminpush_adminpush_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."adminpush_adminpush_serno_seq";
CREATE SEQUENCE "public"."adminpush_adminpush_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for list_list_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."list_list_serno_seq";
CREATE SEQUENCE "public"."list_list_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for listwork_list_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."listwork_list_serno_seq";
CREATE SEQUENCE "public"."listwork_list_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for listwork_listwork_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."listwork_listwork_serno_seq";
CREATE SEQUENCE "public"."listwork_listwork_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for listwork_work_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."listwork_work_serno_seq";
CREATE SEQUENCE "public"."listwork_work_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;


-- ----------------------------
-- Sequence structure for projecthint_projecthint_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."projecthint_projecthint_serno_seq";
CREATE SEQUENCE "public"."projecthint_projecthint_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for projectlist_list_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."projectlist_list_serno_seq";
CREATE SEQUENCE "public"."projectlist_list_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for projectlist_projectlist_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."projectlist_projectlist_serno_seq";
CREATE SEQUENCE "public"."projectlist_projectlist_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for projectpermission_projectpermission_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."projectpermission_projectpermission_serno_seq";
CREATE SEQUENCE "public"."projectpermission_projectpermission_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;


-- ----------------------------
-- Sequence structure for teammember_teammember_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."teammember_teammember_serno_seq";
CREATE SEQUENCE "public"."teammember_teammember_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for work_work_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."work_work_serno_seq";
CREATE SEQUENCE "public"."work_work_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for workhint_work_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."workhint_work_serno_seq";
CREATE SEQUENCE "public"."workhint_work_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for workhint_workhint_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."workhint_workhint_serno_seq";
CREATE SEQUENCE "public"."workhint_workhint_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for adminpush
-- ----------------------------
DROP TABLE IF EXISTS "public"."adminpush";
CREATE TABLE "public"."adminpush" (
  "adminpush_serno" int4 NOT NULL DEFAULT nextval('adminpush_adminpush_serno_seq'::regclass),
  "project_id" varchar(255) COLLATE "pg_catalog"."default",
  "adminpush_content" varchar(255) COLLATE "pg_catalog"."default",
  "adminpush_startdate" timestamp(6),
  "adminpush_enddate" timestamp(6)
)
;

-- ----------------------------
-- Records of adminpush
-- ----------------------------
INSERT INTO "public"."adminpush" VALUES (1, NULL, '提醒一', '2019-05-25 17:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (2, NULL, '提醒二', '2019-06-11 16:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (3, NULL, '提醒三', '2019-03-12 15:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (4, NULL, '提醒四', '2019-01-13 14:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (5, NULL, '提醒五', '2019-03-23 13:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (6, NULL, '提醒六', '2019-06-23 12:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (7, NULL, '提醒七', '2019-07-11 11:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (8, NULL, '提醒八', '2019-05-12 10:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (9, NULL, '提醒九', '2019-07-24 19:18:15', '2019-05-25 17:18:15');
INSERT INTO "public"."adminpush" VALUES (10, NULL, '提醒十', '2019-01-13 18:18:15', '2019-05-25 17:18:15');

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS "public"."list";
CREATE TABLE "public"."list" (
  "list_serno" int8 NOT NULL,
  "list_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO "public"."list" VALUES (1, '列表一');
INSERT INTO "public"."list" VALUES (2, '列表二');
INSERT INTO "public"."list" VALUES (3, '列表三');
INSERT INTO "public"."list" VALUES (4, '列表四');
INSERT INTO "public"."list" VALUES (5, '列表五');
INSERT INTO "public"."list" VALUES (6, '列表六');
INSERT INTO "public"."list" VALUES (7, '列表七');
INSERT INTO "public"."list" VALUES (8, '列表八');
INSERT INTO "public"."list" VALUES (9, '列表九');
INSERT INTO "public"."list" VALUES (10, '列表十');
INSERT INTO "public"."list" VALUES (51, 'list');
INSERT INTO "public"."list" VALUES (52, 'list');
INSERT INTO "public"."list" VALUES (53, 'list');
INSERT INTO "public"."list" VALUES (54, 'list');
INSERT INTO "public"."list" VALUES (55, 'AAAA');
INSERT INTO "public"."list" VALUES (56, 'AAAA');
INSERT INTO "public"."list" VALUES (57, 'AAAA');

-- ----------------------------
-- Table structure for listwork
-- ----------------------------
DROP TABLE IF EXISTS "public"."listwork";
CREATE TABLE "public"."listwork" (
  "listwork_serno" int4 NOT NULL DEFAULT nextval('listwork_listwork_serno_seq'::regclass),
  "list_serno" int4 NOT NULL DEFAULT nextval('listwork_list_serno_seq'::regclass),
  "work_serno" int8
)
;

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS "public"."member";
CREATE TABLE "public"."member" (
  "user_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "photo" bytea,
  "member_name" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "member_password" varchar(255) COLLATE "pg_catalog"."default",
  "linebotpush" bool DEFAULT false
)
;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO "public"."member" VALUES ('C003', E'1.jpg', '徐天良', '1046444@gmail.com', 'asd556q2', 'f');
INSERT INTO "public"."member" VALUES ('D001', E'1.jpg', '章詒', 'B1356444@gmail.com', 'qw0233sd', 't');
INSERT INTO "public"."member" VALUES ('E001', E'3.jpg', '天心', 'A1066444@gmail.com', 'wqed156dvs', 't');
INSERT INTO "public"."member" VALUES ('F001', E'4.jpg', '費德勒', 'A1057444@gmail.com', 'asd561dsv', 'f');
INSERT INTO "public"."member" VALUES ('G001', E'A01.jpg', '古拉爵', 'D1056844@gmail.com', '1r5bww2', 'f');
INSERT INTO "public"."member" VALUES ('H001', E'SAD.jpg', '史瓦尼', '1026444@gmail.com', 'wefq65w', 't');
INSERT INTO "public"."member" VALUES ('I001', E'QWE.jpg', '特斯拉', 'Q10556444@gmail.com', 'b1sf912d', 'f');
INSERT INTO "public"."member" VALUES ('J001', E'ERT.jpg', '雅柏格', 'V1056744@gmail.com', 'qwe15b65r', 'f');
INSERT INTO "public"."member" VALUES ('A001', E'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', '張小明', 'N1056444@gmail.com', 'A123a123b123', 't');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS "public"."project";
CREATE TABLE "public"."project" (
  "project_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "project_password" varchar(255) COLLATE "pg_catalog"."default",
  "project_name" varchar(255) COLLATE "pg_catalog"."default",
  "project_startdate" timestamp(6),
  "project_enddate" timestamp(6)
)
;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO "public"."project" VALUES ('A001', '001A', '專案一', '2019-01-26 15:12:17', '2019-02-05 18:47:17');
INSERT INTO "public"."project" VALUES ('C001', '001A', '專案三', '2019-03-26 19:35:17', '2019-07-08 20:45:17');
INSERT INTO "public"."project" VALUES ('D001', '001A', '專案四', '2019-04-26 21:18:17', '2019-08-09 07:44:17');
INSERT INTO "public"."project" VALUES ('E001', '001A', '專案五', '2019-01-22 08:25:17', '2019-09-10 08:43:17');
INSERT INTO "public"."project" VALUES ('F001', '001A', '專案六', '2019-01-28 19:55:17', '2019-10-11 10:42:17');
INSERT INTO "public"."project" VALUES ('I001', '001A', '專案九', '2019-02-15 15:48:17', '2019-08-14 17:39:17');
INSERT INTO "public"."project" VALUES ('J001', '001A', '專案十', '2019-03-21 17:38:17', '2019-07-15 18:38:17');
INSERT INTO "public"."project" VALUES ('B001', 'dsfghjk', '專案二', '2019-02-26 18:41:17', '2019-06-07 19:46:17');
INSERT INTO "public"."project" VALUES ('c9GZU42y', 'qwertyuiop', '專案十一', '2019-05-10 22:10:00', '2019-05-10 22:12:00');
INSERT INTO "public"."project" VALUES ('H001', '001A', '專案八', '2019-01-30 13:12:17', '2019-12-13 16:40:17');
INSERT INTO "public"."project" VALUES ('G001', '001A', '專案七', '2019-01-29 15:15:17', '2019-11-12 15:41:17');

-- ----------------------------
-- Table structure for projecthint
-- ----------------------------
DROP TABLE IF EXISTS "public"."projecthint";
CREATE TABLE "public"."projecthint" (
  "projecthint_serno" int4 NOT NULL DEFAULT nextval('projecthint_projecthint_serno_seq'::regclass),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "project_id" varchar(255) COLLATE "pg_catalog"."default",
  "project_hint" bool DEFAULT false
)
;

-- ----------------------------
-- Records of projecthint
-- ----------------------------
INSERT INTO "public"."projecthint" VALUES (1, NULL, NULL, 't');
INSERT INTO "public"."projecthint" VALUES (2, NULL, NULL, 'f');
INSERT INTO "public"."projecthint" VALUES (3, NULL, NULL, 't');
INSERT INTO "public"."projecthint" VALUES (4, NULL, NULL, 't');
INSERT INTO "public"."projecthint" VALUES (5, NULL, NULL, 't');
INSERT INTO "public"."projecthint" VALUES (6, NULL, NULL, 't');
INSERT INTO "public"."projecthint" VALUES (7, NULL, NULL, 't');
INSERT INTO "public"."projecthint" VALUES (8, NULL, NULL, 'f');
INSERT INTO "public"."projecthint" VALUES (9, NULL, NULL, 'f');
INSERT INTO "public"."projecthint" VALUES (10, NULL, NULL, 'f');

-- ----------------------------
-- Table structure for projectlist
-- ----------------------------
DROP TABLE IF EXISTS "public"."projectlist";
CREATE TABLE "public"."projectlist" (
  "projectlist_serno" int4 NOT NULL DEFAULT nextval('projectlist_projectlist_serno_seq'::regclass),
  "project_id" varchar(255) COLLATE "pg_catalog"."default",
  "list_serno" int8
)
;

-- ----------------------------
-- Table structure for projectpermission
-- ----------------------------
DROP TABLE IF EXISTS "public"."projectpermission";
CREATE TABLE "public"."projectpermission" (
  "projectpermission_serno" int4 NOT NULL DEFAULT nextval('projectpermission_projectpermission_serno_seq'::regclass),
  "project_id" varchar(255) COLLATE "pg_catalog"."default",
  "list_permission" bool DEFAULT false,
  "add_work" bool DEFAULT false,
  "edit_work" bool DEFAULT false,
  "delete_work" bool DEFAULT false
)
;

-- ----------------------------
-- Records of projectpermission
-- ----------------------------
INSERT INTO "public"."projectpermission" VALUES (1, NULL, 't', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (2, NULL, 't', 'f', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (3, NULL, 't', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (4, NULL, 't', 'f', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (5, NULL, 't', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (6, NULL, 't', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (7, NULL, 't', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (8, NULL, 't', 't', 't', 't');
INSERT INTO "public"."projectpermission" VALUES (9, NULL, 't', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (10, NULL, 'f', 't', 'f', 't');
INSERT INTO "public"."projectpermission" VALUES (51, 'c9GZU42y', 'f', 'f', 'f', 'f');

-- ----------------------------
-- Table structure for teammember
-- ----------------------------
DROP TABLE IF EXISTS "public"."teammember";
CREATE TABLE "public"."teammember" (
  "teammember_serno" int4 NOT NULL DEFAULT nextval('teammember_teammember_serno_seq'::regclass),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "project_id" varchar(255) COLLATE "pg_catalog"."default",
  "group_id" varchar(255) COLLATE "pg_catalog"."default",
  "isadmin" bool DEFAULT false
)
;

-- ----------------------------
-- Records of teammember
-- ----------------------------
INSERT INTO "public"."teammember" VALUES (1, 'A001', 'B001', 'A001', 't');
INSERT INTO "public"."teammember" VALUES (2, 'C003', 'B001', 'B001', 'f');
INSERT INTO "public"."teammember" VALUES (3, 'D001', 'A001', 'C001', 't');
INSERT INTO "public"."teammember" VALUES (4, 'E001', 'C001', 'D001', 'f');
INSERT INTO "public"."teammember" VALUES (5, 'A001', 'G001', 'E001', 't');
INSERT INTO "public"."teammember" VALUES (6, 'F001', 'E001', 'F001', 'f');
INSERT INTO "public"."teammember" VALUES (7, 'G001', 'D001', 'G001', 't');
INSERT INTO "public"."teammember" VALUES (8, 'E001', 'F001', 'H001', 't');
INSERT INTO "public"."teammember" VALUES (9, 'A001', 'H001', 'I001', 'f');
INSERT INTO "public"."teammember" VALUES (10, 'C003', 'I001', 'J001', 'f');
INSERT INTO "public"."teammember" VALUES (51, 'A001', 'c9GZU42y', NULL, NULL);

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS "public"."work";
CREATE TABLE "public"."work" (
  "work_serno" int8 NOT NULL,
  "work_title" varchar(255) COLLATE "pg_catalog"."default",
  "work_content" varchar(255) COLLATE "pg_catalog"."default",
  "deadline" timestamp(6),
  "tag" varchar(255) COLLATE "pg_catalog"."default",
  "file" varchar(255) COLLATE "pg_catalog"."default",
  "first_principal" varchar(255) COLLATE "pg_catalog"."default",
  "second_principal" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO "public"."work" VALUES (1, '工作一', '這是工作一', '2019-05-25 17:18:15', '@工作', 'zip檔案', '王曉明', '張大陸');
INSERT INTO "public"."work" VALUES (2, '工作二', '這是工作二', '2019-05-25 17:18:15', '@工作', 'zip檔案', '測豐碩', '張辜陸');
INSERT INTO "public"."work" VALUES (3, '工作三', '這是工作三', '2019-05-25 17:18:15', '@工作', 'zip檔案', '一條先', '德先');
INSERT INTO "public"."work" VALUES (4, '工作四', '這是工作四', '2019-05-25 17:18:15', '@工作', 'zip檔案', '餔普忒', '特踢');
INSERT INTO "public"."work" VALUES (5, '工作五', '這是工作五', '2019-05-25 17:18:15', '@工作', 'zip檔案', '謀辜', '估三大');
INSERT INTO "public"."work" VALUES (6, '工作六', '這是工作六', '2019-05-25 17:18:15', '@工作', 'zip檔案', '特蘇噴', '章三大');
INSERT INTO "public"."work" VALUES (7, '工作七', '這是工作七', '2019-05-25 17:18:15', '@工作', 'zip檔案', '辜三是', '一二心');
INSERT INTO "public"."work" VALUES (8, '工作八', '這是工作八', '2019-05-25 17:18:15', '@工作', 'zip檔案', '陳世強', '揚威祥');
INSERT INTO "public"."work" VALUES (9, '工作九', '這是工作九', '2019-05-25 17:18:15', '@工作', 'zip檔案', '章德馨', '斯紅葉');
INSERT INTO "public"."work" VALUES (10, '工作十', '這是工作十', '2019-05-25 17:18:15', '@工作', 'zip檔案', '陳博生', '李正彥');
INSERT INTO "public"."work" VALUES (51, '工作十一', '這是工作十一', '2019-05-15 14:16:16', '@號', 'ZIP', '張浩浩', '璇璇');

-- ----------------------------
-- Table structure for workhint
-- ----------------------------
DROP TABLE IF EXISTS "public"."workhint";
CREATE TABLE "public"."workhint" (
  "workhint_serno" int4 NOT NULL DEFAULT nextval('workhint_workhint_serno_seq'::regclass),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "work_serno" int8,
  "work_hint" bool DEFAULT false
)
;

-- ----------------------------
-- Records of workhint
-- ----------------------------
INSERT INTO "public"."workhint" VALUES (1, NULL, 1, 't');
INSERT INTO "public"."workhint" VALUES (2, NULL, 2, 't');
INSERT INTO "public"."workhint" VALUES (3, NULL, 3, 'f');
INSERT INTO "public"."workhint" VALUES (4, NULL, 4, 'f');
INSERT INTO "public"."workhint" VALUES (5, NULL, 5, 't');
INSERT INTO "public"."workhint" VALUES (6, NULL, 6, 't');
INSERT INTO "public"."workhint" VALUES (7, NULL, 7, 't');
INSERT INTO "public"."workhint" VALUES (8, NULL, 8, 'f');
INSERT INTO "public"."workhint" VALUES (9, NULL, 9, 't');
INSERT INTO "public"."workhint" VALUES (10, NULL, 10, 't');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."adminpush_adminpush_serno_seq"', 100, false);
SELECT setval('"public"."list_list_serno_seq"', 100, false);
SELECT setval('"public"."listwork_list_serno_seq"', 100, false);
SELECT setval('"public"."listwork_listwork_serno_seq"', 100, false);
SELECT setval('"public"."listwork_work_serno_seq"', 100, false);
SELECT setval('"public"."projecthint_projecthint_serno_seq"', 100, false);
SELECT setval('"public"."projectlist_list_serno_seq"', 100, false);
SELECT setval('"public"."projectlist_projectlist_serno_seq"', 100, false);
SELECT setval('"public"."projectpermission_projectpermission_serno_seq"', 100, false);
SELECT setval('"public"."teammember_teammember_serno_seq"', 100, false);
SELECT setval('"public"."work_work_serno_seq"', 100, false);
SELECT setval('"public"."workhint_work_serno_seq"', 100, false);
SELECT setval('"public"."workhint_workhint_serno_seq"', 100, false);

-- ----------------------------
-- Primary Key structure for table adminpush
-- ----------------------------
ALTER TABLE "public"."adminpush" ADD CONSTRAINT "adminpush_pkey" PRIMARY KEY ("adminpush_serno");

-- ----------------------------
-- Primary Key structure for table list
-- ----------------------------
ALTER TABLE "public"."list" ADD CONSTRAINT "list_pkey" PRIMARY KEY ("list_serno");

-- ----------------------------
-- Primary Key structure for table listwork
-- ----------------------------
ALTER TABLE "public"."listwork" ADD CONSTRAINT "listwork_pkey" PRIMARY KEY ("listwork_serno");

-- ----------------------------
-- Primary Key structure for table member
-- ----------------------------
ALTER TABLE "public"."member" ADD CONSTRAINT "member_pkey" PRIMARY KEY ("user_id");

-- ----------------------------
-- Primary Key structure for table project
-- ----------------------------
ALTER TABLE "public"."project" ADD CONSTRAINT "project_pkey" PRIMARY KEY ("project_id");

-- ----------------------------
-- Primary Key structure for table projecthint
-- ----------------------------
ALTER TABLE "public"."projecthint" ADD CONSTRAINT "projecthint_pkey" PRIMARY KEY ("projecthint_serno");

-- ----------------------------
-- Primary Key structure for table projectlist
-- ----------------------------
ALTER TABLE "public"."projectlist" ADD CONSTRAINT "projectlist_pkey" PRIMARY KEY ("projectlist_serno");

-- ----------------------------
-- Primary Key structure for table projectpermission
-- ----------------------------
ALTER TABLE "public"."projectpermission" ADD CONSTRAINT "projectpermission_pkey" PRIMARY KEY ("projectpermission_serno");

-- ----------------------------
-- Primary Key structure for table teammember
-- ----------------------------
ALTER TABLE "public"."teammember" ADD CONSTRAINT "teammember_pkey" PRIMARY KEY ("teammember_serno");

-- ----------------------------
-- Primary Key structure for table work
-- ----------------------------
ALTER TABLE "public"."work" ADD CONSTRAINT "work_pkey" PRIMARY KEY ("work_serno");

-- ----------------------------
-- Primary Key structure for table workhint
-- ----------------------------
ALTER TABLE "public"."workhint" ADD CONSTRAINT "workhint_pkey" PRIMARY KEY ("workhint_serno");

-- ----------------------------
-- Foreign Keys structure for table adminpush
-- ----------------------------
ALTER TABLE "public"."adminpush" ADD CONSTRAINT "adminpush_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project" ("project_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table listwork
-- ----------------------------
ALTER TABLE "public"."listwork" ADD CONSTRAINT "listwork_list_serno_fkey" FOREIGN KEY ("list_serno") REFERENCES "public"."list" ("list_serno") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."listwork" ADD CONSTRAINT "listwork_work_serno_fkey" FOREIGN KEY ("work_serno") REFERENCES "public"."work" ("work_serno") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table projecthint
-- ----------------------------
ALTER TABLE "public"."projecthint" ADD CONSTRAINT "projecthint_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project" ("project_id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."projecthint" ADD CONSTRAINT "projecthint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."member" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table projectlist
-- ----------------------------
ALTER TABLE "public"."projectlist" ADD CONSTRAINT "projectlist_list_serno_fkey" FOREIGN KEY ("list_serno") REFERENCES "public"."list" ("list_serno") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."projectlist" ADD CONSTRAINT "projectlist_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project" ("project_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table projectpermission
-- ----------------------------
ALTER TABLE "public"."projectpermission" ADD CONSTRAINT "fk1" FOREIGN KEY ("project_id") REFERENCES "public"."project" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table teammember
-- ----------------------------
ALTER TABLE "public"."teammember" ADD CONSTRAINT "teammember_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project" ("project_id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."teammember" ADD CONSTRAINT "teammember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."member" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table workhint
-- ----------------------------
ALTER TABLE "public"."workhint" ADD CONSTRAINT "workhint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."member" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."workhint" ADD CONSTRAINT "workhint_work_serno_fkey" FOREIGN KEY ("work_serno") REFERENCES "public"."work" ("work_serno") ON DELETE RESTRICT ON UPDATE RESTRICT;
