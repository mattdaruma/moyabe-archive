-- Database: gameforms

-- DROP DATABASE gameforms;

CREATE DATABASE gameforms
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE gameforms
    IS 'Work database, auth, and templates for game forms app.';

-- Table: public.user

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    "userId" uuid NOT NULL,
    identity character varying COLLATE pg_catalog."default" NOT NULL,
    display character varying COLLATE pg_catalog."default" NOT NULL,
    "createdByUserId" uuid,
    "archiveByUserId" uuid,
    "createdDate" integer NOT NULL,
    "archiveDate" integer,
    archive boolean,
    CONSTRAINT user_pkey PRIMARY KEY ("userId"),
    CONSTRAINT "userArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "userCreatedByUserId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;

COMMENT ON COLUMN public."user"."createdByUserId"
    IS 'createdByUser';

COMMENT ON COLUMN public."user"."archiveByUserId"
    IS 'archiveByUserId';

COMMENT ON COLUMN public."user"."createdDate"
    IS 'cd';

COMMENT ON COLUMN public."user"."archiveDate"
    IS 'ad';

COMMENT ON COLUMN public."user".archive
    IS 'arc';

COMMENT ON CONSTRAINT "userArchiveByUserId_fkey" ON public."user"
    IS 'aa';
COMMENT ON CONSTRAINT "userCreatedByUserId_fkey" ON public."user"
    IS 'userCreatedByUserId_fkey';
-- Index: fki_userArchiveByUserId_fkey

-- DROP INDEX public."fki_userArchiveByUserId_fkey";

CREATE INDEX "fki_userArchiveByUserId_fkey"
    ON public."user" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.queue

-- DROP TABLE public.queue;

CREATE TABLE public.queue
(
    "queueId" uuid NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    icon character varying COLLATE pg_catalog."default",
    color character varying COLLATE pg_catalog."default",
    "createdByUserId" uuid NOT NULL,
    "archiveDate" date,
    "archiveByUserId" uuid,
    "createdDate" integer NOT NULL,
    archive boolean,
    CONSTRAINT queue_pkey PRIMARY KEY ("queueId"),
    CONSTRAINT "queueArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "queueCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.queue
    OWNER to postgres;

COMMENT ON TABLE public.queue
    IS 'queue comment';

COMMENT ON COLUMN public.queue."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public.queue."archiveDate"
    IS 'date of archive';

COMMENT ON COLUMN public.queue."archiveByUserId"
    IS 'archiveByUserId';

COMMENT ON COLUMN public.queue."createdDate"
    IS 'cd';

COMMENT ON COLUMN public.queue.archive
    IS 'arc';

COMMENT ON CONSTRAINT "queueArchiveByUserId_fkey" ON public.queue
    IS 'queueArchiveByUserId_fkey';
COMMENT ON CONSTRAINT "queueCreatedByUserId_fkey" ON public.queue
    IS 'queueCreatedByUserId_fkey';
-- Index: fki_queueArchiveByUserId_fkey

-- DROP INDEX public."fki_queueArchiveByUserId_fkey";

CREATE INDEX "fki_queueArchiveByUserId_fkey"
    ON public.queue USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_queueCreatedByUserId_fkey

-- DROP INDEX public."fki_queueCreatedByUserId_fkey";

CREATE INDEX "fki_queueCreatedByUserId_fkey"
    ON public.queue USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.queueManageRole

-- DROP TABLE public."queueManageRole";

CREATE TABLE public."queueManageRole"
(
    "queueManageRoleId" uuid NOT NULL,
    "queueId" uuid NOT NULL,
    role character varying COLLATE pg_catalog."default",
    "createdByUserId" uuid NOT NULL,
    archive bit(1),
    "archiveByUserId" uuid,
    "createdDate" integer NOT NULL,
    "archiveDate" integer,
    CONSTRAINT "queueManageRole_pkey" PRIMARY KEY ("queueManageRoleId"),
    CONSTRAINT "queueManageRoleCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "queueManageRoleQueueId_fkey" FOREIGN KEY ("queueId")
        REFERENCES public.queue ("queueId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."queueManageRole"
    OWNER to postgres;

COMMENT ON COLUMN public."queueManageRole"."queueManageRoleId"
    IS 'queueManageRoleId';

COMMENT ON COLUMN public."queueManageRole"."queueId"
    IS 'qd';

COMMENT ON COLUMN public."queueManageRole".role
    IS 'r';

COMMENT ON COLUMN public."queueManageRole"."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public."queueManageRole".archive
    IS 'ar';

COMMENT ON COLUMN public."queueManageRole"."archiveByUserId"
    IS 'ab';

COMMENT ON COLUMN public."queueManageRole"."createdDate"
    IS 'cd';

COMMENT ON COLUMN public."queueManageRole"."archiveDate"
    IS 'archiveDate';
COMMENT ON CONSTRAINT "queueManageRole_pkey" ON public."queueManageRole"
    IS 'queueManageRole_pkey';

COMMENT ON CONSTRAINT "queueManageRoleCreatedByUserId_fkey" ON public."queueManageRole"
    IS 'queueManageRoleCreatedByUserId_fkey';
COMMENT ON CONSTRAINT "queueManageRoleQueueId_fkey" ON public."queueManageRole"
    IS 'queueManageRoleQueueId_fkey';
-- Index: fki_queueManageRoleCreatedByUserId_fkey

-- DROP INDEX public."fki_queueManageRoleCreatedByUserId_fkey";

CREATE INDEX "fki_queueManageRoleCreatedByUserId_fkey"
    ON public."queueManageRole" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_queueManageRoleQueueId_fkey

-- DROP INDEX public."fki_queueManageRoleQueueId_fkey";

CREATE INDEX "fki_queueManageRoleQueueId_fkey"
    ON public."queueManageRole" USING btree
    ("queueId" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.queueWorkRole

-- DROP TABLE public."queueWorkRole";

CREATE TABLE public."queueWorkRole"
(
    "queueWorkRoleId" uuid NOT NULL,
    "queueId" uuid NOT NULL,
    role character varying COLLATE pg_catalog."default" NOT NULL,
    "createdDate" integer NOT NULL,
    "createdByUserId" uuid NOT NULL,
    "archiveDate" integer,
    "archiveByUserId" uuid,
    archive boolean,
    CONSTRAINT "queueWorkRole_pkey" PRIMARY KEY ("queueWorkRoleId"),
    CONSTRAINT "queueWorkRoleArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "queueWorkRoleCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "queueWorkRoleQueueId_fkey" FOREIGN KEY ("queueId")
        REFERENCES public.queue ("queueId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."queueWorkRole"
    OWNER to postgres;

COMMENT ON TABLE public."queueWorkRole"
    IS 'qwr';

COMMENT ON COLUMN public."queueWorkRole"."createdDate"
    IS 'cd';

COMMENT ON COLUMN public."queueWorkRole"."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public."queueWorkRole"."archiveDate"
    IS 'archiveDate';

COMMENT ON COLUMN public."queueWorkRole"."archiveByUserId"
    IS 'archiveByUserId';

COMMENT ON CONSTRAINT "queueWorkRoleCreatedByUserId_fkey" ON public."queueWorkRole"
    IS 'queueWorkRoleCreatedByUserId';
COMMENT ON CONSTRAINT "queueWorkRoleQueueId_fkey" ON public."queueWorkRole"
    IS 'queueWorkRoleQueueId_fkey';
-- Index: fki_queueWorkRoleArchiveByUserId_fkey

-- DROP INDEX public."fki_queueWorkRoleArchiveByUserId_fkey";

CREATE INDEX "fki_queueWorkRoleArchiveByUserId_fkey"
    ON public."queueWorkRole" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_queueWorkRoleCreatedByUserId

-- DROP INDEX public."fki_queueWorkRoleCreatedByUserId";

CREATE INDEX "fki_queueWorkRoleCreatedByUserId"
    ON public."queueWorkRole" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_queueWorkRoleQueueId_fkey

-- DROP INDEX public."fki_queueWorkRoleQueueId_fkey";

CREATE INDEX "fki_queueWorkRoleQueueId_fkey"
    ON public."queueWorkRole" USING btree
    ("queueId" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.adminRole

-- DROP TABLE public."adminRole";

CREATE TABLE public."adminRole"
(
    "adminRoleId" uuid NOT NULL,
    role character varying COLLATE pg_catalog."default" NOT NULL,
    "createdByUserId" uuid NOT NULL,
    "archiveByUserId" uuid,
    "createdDate" integer NOT NULL,
    "archiveDate" integer,
    archive boolean,
    CONSTRAINT "adminRole_pkey" PRIMARY KEY ("adminRoleId"),
    CONSTRAINT "adminRoleArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "adminRoleCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."adminRole"
    OWNER to postgres;

COMMENT ON TABLE public."adminRole"
    IS 'ar';

COMMENT ON COLUMN public."adminRole"."adminRoleId"
    IS 'adminRoleId';

COMMENT ON COLUMN public."adminRole".role
    IS 'role';

COMMENT ON COLUMN public."adminRole"."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public."adminRole"."archiveByUserId"
    IS 'ab';

COMMENT ON COLUMN public."adminRole"."createdDate"
    IS 'cd';

COMMENT ON COLUMN public."adminRole"."archiveDate"
    IS 'ad';

COMMENT ON COLUMN public."adminRole".archive
    IS 'arc';
COMMENT ON CONSTRAINT "adminRole_pkey" ON public."adminRole"
    IS 'adminRole_pkey';

COMMENT ON CONSTRAINT "adminRoleArchiveByUserId_fkey" ON public."adminRole"
    IS 'adminRoleArchiveByUserId_fkey';
COMMENT ON CONSTRAINT "adminRoleCreatedByUserId_fkey" ON public."adminRole"
    IS 'adminRoleCreatedByUserId_fkey';
-- Index: fki_adminRoleArchiveByUserId_fkey

-- DROP INDEX public."fki_adminRoleArchiveByUserId_fkey";

CREATE INDEX "fki_adminRoleArchiveByUserId_fkey"
    ON public."adminRole" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_adminRoleCreatedByUserId_fkey

-- DROP INDEX public."fki_adminRoleCreatedByUserId_fkey";

CREATE INDEX "fki_adminRoleCreatedByUserId_fkey"
    ON public."adminRole" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.formTemplate

-- DROP TABLE public."formTemplate";

CREATE TABLE public."formTemplate"
(
    name character varying COLLATE pg_catalog."default" NOT NULL,
    "formTemplateId" uuid NOT NULL,
    description character varying COLLATE pg_catalog."default",
    color character varying COLLATE pg_catalog."default",
    icon character varying COLLATE pg_catalog."default",
    mutation character varying COLLATE pg_catalog."default",
    "createdDate" date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" uuid,
    archive bit(1),
    "archiveDate" date,
    "archiveByUserId" uuid,
    CONSTRAINT formtemplate_pkey PRIMARY KEY ("formTemplateId"),
    CONSTRAINT "formTemplateArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "formTemplateCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."formTemplate"
    OWNER to postgres;

COMMENT ON COLUMN public."formTemplate".name
    IS 'name comment';

COMMENT ON COLUMN public."formTemplate"."formTemplateId"
    IS 'form id comment';

COMMENT ON COLUMN public."formTemplate".description
    IS 'description comment';

COMMENT ON COLUMN public."formTemplate".color
    IS 'color comment';

COMMENT ON COLUMN public."formTemplate".icon
    IS 'icon comment';

COMMENT ON COLUMN public."formTemplate".mutation
    IS 'mutation comment';

COMMENT ON COLUMN public."formTemplate"."createdDate"
    IS 'createdDate';

COMMENT ON COLUMN public."formTemplate"."createdByUserId"
    IS 'createdByUser';

COMMENT ON COLUMN public."formTemplate".archive
    IS 'archive';

COMMENT ON COLUMN public."formTemplate"."archiveDate"
    IS 'archiveDate';

COMMENT ON COLUMN public."formTemplate"."archiveByUserId"
    IS 'archiveByUserId';

COMMENT ON CONSTRAINT "formTemplateArchiveByUserId_fkey" ON public."formTemplate"
    IS 'formTemplateArchiveByUserId_fkey';
COMMENT ON CONSTRAINT "formTemplateCreatedByUserId_fkey" ON public."formTemplate"
    IS 'formTemplateCreatedByUserId_fkey';
-- Index: fki_formTemplateArchiveByUserId_fkey

-- DROP INDEX public."fki_formTemplateArchiveByUserId_fkey";

CREATE INDEX "fki_formTemplateArchiveByUserId_fkey"
    ON public."formTemplate" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_formTemplateCreatedByUserId_fkey

-- DROP INDEX public."fki_formTemplateCreatedByUserId_fkey";

CREATE INDEX "fki_formTemplateCreatedByUserId_fkey"
    ON public."formTemplate" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.fieldTemplate

-- DROP TABLE public."fieldTemplate";

CREATE TABLE public."fieldTemplate"
(
    "fieldTemplateId" uuid NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    label character varying COLLATE pg_catalog."default" NOT NULL,
    type bit varying NOT NULL,
    icon character varying COLLATE pg_catalog."default",
    color character varying COLLATE pg_catalog."default",
    hint character varying COLLATE pg_catalog."default",
    disabled bit(1),
    required bit(1),
    "requiredTrue" bit(1),
    max integer,
    min integer,
    "maxLength" integer,
    "minLength" integer,
    pattern character varying COLLATE pg_catalog."default",
    archive boolean,
    "archiveDate" integer,
    "archiveByUserId" uuid,
    "createdDate" integer NOT NULL,
    "createdByUserId" uuid NOT NULL,
    CONSTRAINT "fieldTemplate_pkey" PRIMARY KEY ("fieldTemplateId")
)

TABLESPACE pg_default;

ALTER TABLE public."fieldTemplate"
    OWNER to postgres;

COMMENT ON COLUMN public."fieldTemplate"."fieldTemplateId"
    IS 'fieldId';

COMMENT ON COLUMN public."fieldTemplate".name
    IS 'name';

COMMENT ON COLUMN public."fieldTemplate".label
    IS 'label';

COMMENT ON COLUMN public."fieldTemplate".type
    IS 't';

COMMENT ON COLUMN public."fieldTemplate".icon
    IS 'icon';

COMMENT ON COLUMN public."fieldTemplate".color
    IS 'c';

COMMENT ON COLUMN public."fieldTemplate".hint
    IS 'h';

COMMENT ON COLUMN public."fieldTemplate".disabled
    IS 'disabled';

COMMENT ON COLUMN public."fieldTemplate".required
    IS 'r';

COMMENT ON COLUMN public."fieldTemplate"."requiredTrue"
    IS 'requiredTrue';

COMMENT ON COLUMN public."fieldTemplate".max
    IS 'm';

COMMENT ON COLUMN public."fieldTemplate".min
    IS 'v';

COMMENT ON COLUMN public."fieldTemplate"."maxLength"
    IS 'maxLength';

COMMENT ON COLUMN public."fieldTemplate"."minLength"
    IS 'minLength';

COMMENT ON COLUMN public."fieldTemplate".pattern
    IS 'asdf';

COMMENT ON COLUMN public."fieldTemplate".archive
    IS 'a';

COMMENT ON COLUMN public."fieldTemplate"."archiveDate"
    IS 'ad';

COMMENT ON COLUMN public."fieldTemplate"."archiveByUserId"
    IS 'ab';

COMMENT ON COLUMN public."fieldTemplate"."createdDate"
    IS 'cd';

COMMENT ON COLUMN public."fieldTemplate"."createdByUserId"
    IS 'cb';


-- Table: public.fieldTemplateInFormTemplate

-- DROP TABLE public."fieldTemplateInFormTemplate";

CREATE TABLE public."fieldTemplateInFormTemplate"
(
    "fieldTemplateInFormTemplateId" uuid NOT NULL,
    "fieldTemplateId" uuid NOT NULL,
    "formTemplateId" uuid NOT NULL,
    "createdDate" date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" uuid NOT NULL,
    archive bit(1),
    "archiveDate" date,
    "archiveByUserId" uuid,
    CONSTRAINT "fieldTemplateInFormTemplate_pkey" PRIMARY KEY ("fieldTemplateInFormTemplateId"),
    CONSTRAINT "fieldTemplateInFormTemplateArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fieldTemplateInFormTemplateCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fieldTemplateInFormTemplateFieldTemplateId_fkey" FOREIGN KEY ("fieldTemplateId")
        REFERENCES public."fieldTemplate" ("fieldTemplateId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fieldTemplateInFormTemplateFormTemplateId_fkey" FOREIGN KEY ("formTemplateId")
        REFERENCES public."formTemplate" ("formTemplateId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."fieldTemplateInFormTemplate"
    OWNER to postgres;

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."fieldTemplateInFormTemplateId"
    IS 'fieldTemplateInFormTemplateId';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."fieldTemplateId"
    IS 'fieldTemplateId';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."formTemplateId"
    IS 'formTemplateId';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."createdDate"
    IS 'createdDate';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate".archive
    IS 'archive';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."archiveDate"
    IS 'archiveDate';

COMMENT ON COLUMN public."fieldTemplateInFormTemplate"."archiveByUserId"
    IS 'archiveByUserId';
COMMENT ON CONSTRAINT "fieldTemplateInFormTemplate_pkey" ON public."fieldTemplateInFormTemplate"
    IS 'fieldTemplateInFormTemplate_pkey';

COMMENT ON CONSTRAINT "fieldTemplateInFormTemplateArchiveByUserId_fkey" ON public."fieldTemplateInFormTemplate"
    IS 'fieldTemplateInFormTemplate';
COMMENT ON CONSTRAINT "fieldTemplateInFormTemplateCreatedByUserId_fkey" ON public."fieldTemplateInFormTemplate"
    IS 'fieldTemplateInFormTemplate';
COMMENT ON CONSTRAINT "fieldTemplateInFormTemplateFieldTemplateId_fkey" ON public."fieldTemplateInFormTemplate"
    IS 'fieldTemplateInFormTemplate';
COMMENT ON CONSTRAINT "fieldTemplateInFormTemplateFormTemplateId_fkey" ON public."fieldTemplateInFormTemplate"
    IS 'fieldTemplateInFormTemplate';
-- Index: fki_fieldTemplateInFormTemplateArchiveByUserId_fkey

-- DROP INDEX public."fki_fieldTemplateInFormTemplateArchiveByUserId_fkey";

CREATE INDEX "fki_fieldTemplateInFormTemplateArchiveByUserId_fkey"
    ON public."fieldTemplateInFormTemplate" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fieldTemplateInFormTemplateCreatedByUserId_fkey

-- DROP INDEX public."fki_fieldTemplateInFormTemplateCreatedByUserId_fkey";

CREATE INDEX "fki_fieldTemplateInFormTemplateCreatedByUserId_fkey"
    ON public."fieldTemplateInFormTemplate" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fieldTemplateInFormTemplateFieldTemplateId_fkey

-- DROP INDEX public."fki_fieldTemplateInFormTemplateFieldTemplateId_fkey";

CREATE INDEX "fki_fieldTemplateInFormTemplateFieldTemplateId_fkey"
    ON public."fieldTemplateInFormTemplate" USING btree
    ("fieldTemplateId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fieldTemplateInFormTemplateFormTemplateId_fkey

-- DROP INDEX public."fki_fieldTemplateInFormTemplateFormTemplateId_fkey";

CREATE INDEX "fki_fieldTemplateInFormTemplateFormTemplateId_fkey"
    ON public."fieldTemplateInFormTemplate" USING btree
    ("formTemplateId" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.work

-- DROP TABLE public.work;

CREATE TABLE public.work
(
    "workId" uuid NOT NULL,
    complete bit(1),
    "formTemplateId" uuid NOT NULL,
    "createdByUserId" uuid NOT NULL,
    "archiveByUserId" uuid,
    "createdDate" integer NOT NULL,
    archive boolean,
    "archiveDate" integer,
    "queueId" uuid NOT NULL,
    CONSTRAINT work_pkey PRIMARY KEY ("workId"),
    CONSTRAINT "workCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workFormTemplateId_fkey" FOREIGN KEY ("formTemplateId")
        REFERENCES public."formTemplate" ("formTemplateId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workQueueId_fkey" FOREIGN KEY ("queueId")
        REFERENCES public.queue ("queueId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.work
    OWNER to postgres;

COMMENT ON TABLE public.work
    IS 'w';

COMMENT ON COLUMN public.work."workId"
    IS 'workId';

COMMENT ON COLUMN public.work.complete
    IS 'complete';

COMMENT ON COLUMN public.work."formTemplateId"
    IS 'formTemplateId';

COMMENT ON COLUMN public.work."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public.work."archiveByUserId"
    IS 'archiveByUserId';

COMMENT ON COLUMN public.work.archive
    IS 'arc';
COMMENT ON CONSTRAINT work_pkey ON public.work
    IS 'work_pkey';

COMMENT ON CONSTRAINT "workCreatedByUserId_fkey" ON public.work
    IS 'workCreatedByUserId_fkey';
COMMENT ON CONSTRAINT "workFormTemplateId_fkey" ON public.work
    IS 'workFormTemplateId_fkey';
COMMENT ON CONSTRAINT "workQueueId_fkey" ON public.work
    IS 'workQueueId_fkey';
-- Index: fki_workCreatedByUserId_fkey

-- DROP INDEX public."fki_workCreatedByUserId_fkey";

CREATE INDEX "fki_workCreatedByUserId_fkey"
    ON public.work USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workFormTemplateId_fkey

-- DROP INDEX public."fki_workFormTemplateId_fkey";

CREATE INDEX "fki_workFormTemplateId_fkey"
    ON public.work USING btree
    ("formTemplateId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workQueueId_fkey

-- DROP INDEX public."fki_workQueueId_fkey";

CREATE INDEX "fki_workQueueId_fkey"
    ON public.work USING btree
    ("queueId" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.workDataList

-- DROP TABLE public."workDataList";

CREATE TABLE public."workDataList"
(
    "workDataListId" uuid NOT NULL,
    "workId" uuid NOT NULL,
    "fieldTemplateId" uuid NOT NULL,
    key character varying COLLATE pg_catalog."default",
    value character varying COLLATE pg_catalog."default",
    "createdDate" date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" uuid NOT NULL,
    archive bit(1),
    "archiveDate" date,
    "archiveByUserId" uuid,
    CONSTRAINT "workListData_pkey" PRIMARY KEY ("workDataListId"),
    CONSTRAINT "workDataListArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workDataListCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workDataListFieldTemplateId_fkey" FOREIGN KEY ("fieldTemplateId")
        REFERENCES public."fieldTemplate" ("fieldTemplateId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workDataListWorkId_fkey" FOREIGN KEY ("workId")
        REFERENCES public.work ("workId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."workDataList"
    OWNER to postgres;

COMMENT ON COLUMN public."workDataList"."workDataListId"
    IS 'datalistId';

COMMENT ON COLUMN public."workDataList"."workId"
    IS 'workId';

COMMENT ON COLUMN public."workDataList"."fieldTemplateId"
    IS 'fieldId';

COMMENT ON COLUMN public."workDataList".key
    IS 'key';

COMMENT ON COLUMN public."workDataList".value
    IS 'va';

COMMENT ON COLUMN public."workDataList"."createdDate"
    IS 'createdDate';

COMMENT ON COLUMN public."workDataList"."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public."workDataList".archive
    IS 'a';

COMMENT ON COLUMN public."workDataList"."archiveDate"
    IS 'archiveDate';

COMMENT ON COLUMN public."workDataList"."archiveByUserId"
    IS 'archiveByUserId';
COMMENT ON CONSTRAINT "workListData_pkey" ON public."workDataList"
    IS 'workListData_pkey';

COMMENT ON CONSTRAINT "workDataListArchiveByUserId_fkey" ON public."workDataList"
    IS 'workDataListArchiveByUserId_fkey';
COMMENT ON CONSTRAINT "workDataListCreatedByUserId_fkey" ON public."workDataList"
    IS 'workDataListCreatedByUserId_fkey';
COMMENT ON CONSTRAINT "workDataListFieldTemplateId_fkey" ON public."workDataList"
    IS 'workDataListFieldId_fkey';
COMMENT ON CONSTRAINT "workDataListWorkId_fkey" ON public."workDataList"
    IS 'workDataListWorkId_fkey';
-- Index: fki_workDataListArchiveByUserId_fkey

-- DROP INDEX public."fki_workDataListArchiveByUserId_fkey";

CREATE INDEX "fki_workDataListArchiveByUserId_fkey"
    ON public."workDataList" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workDataListCreatedByUserId_fkey

-- DROP INDEX public."fki_workDataListCreatedByUserId_fkey";

CREATE INDEX "fki_workDataListCreatedByUserId_fkey"
    ON public."workDataList" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workDataListFieldId_fkey

-- DROP INDEX public."fki_workDataListFieldId_fkey";

CREATE INDEX "fki_workDataListFieldId_fkey"
    ON public."workDataList" USING btree
    ("fieldTemplateId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workDataListWorkId_fkey

-- DROP INDEX public."fki_workDataListWorkId_fkey";

CREATE INDEX "fki_workDataListWorkId_fkey"
    ON public."workDataList" USING btree
    ("workId" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.workDataValue

-- DROP TABLE public."workDataValue";

CREATE TABLE public."workDataValue"
(
    "workDataValueId" uuid NOT NULL,
    "workId" uuid,
    "fieldTemplateId" uuid,
    key character varying COLLATE pg_catalog."default",
    value character varying COLLATE pg_catalog."default",
    "createdDate" date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" uuid NOT NULL,
    archive bit(1),
    "archiveDate" date,
    "archiveByUserId" uuid,
    CONSTRAINT "workDataValue_pkey" PRIMARY KEY ("workDataValueId"),
    CONSTRAINT "workDataValueArchiveByUserId_fkey" FOREIGN KEY ("archiveByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workDataValueCreatedByUserId_fkey" FOREIGN KEY ("createdByUserId")
        REFERENCES public."user" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workDataValueFieldTemplateId_fkey" FOREIGN KEY ("fieldTemplateId")
        REFERENCES public."fieldTemplate" ("fieldTemplateId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "workDataValueWorkId_fkey" FOREIGN KEY ("workId")
        REFERENCES public.work ("workId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public."workDataValue"
    OWNER to postgres;

COMMENT ON TABLE public."workDataValue"
    IS 'workDataValue';

COMMENT ON COLUMN public."workDataValue"."workId"
    IS 'workId';

COMMENT ON COLUMN public."workDataValue"."fieldTemplateId"
    IS 'fieldId';

COMMENT ON COLUMN public."workDataValue".key
    IS 'key';

COMMENT ON COLUMN public."workDataValue".value
    IS 'value';

COMMENT ON COLUMN public."workDataValue"."createdDate"
    IS 'cd';

COMMENT ON COLUMN public."workDataValue"."createdByUserId"
    IS 'createdByUserId';

COMMENT ON COLUMN public."workDataValue".archive
    IS 'a';

COMMENT ON COLUMN public."workDataValue"."archiveDate"
    IS 'archiveDate';

COMMENT ON COLUMN public."workDataValue"."archiveByUserId"
    IS 'archiveByUserId';

COMMENT ON CONSTRAINT "workDataValueArchiveByUserId_fkey" ON public."workDataValue"
    IS 'workDataValueArchiveByUserId_fkey';
COMMENT ON CONSTRAINT "workDataValueCreatedByUserId_fkey" ON public."workDataValue"
    IS 'workDataValueCreatedByUserId_fkey';
COMMENT ON CONSTRAINT "workDataValueFieldTemplateId_fkey" ON public."workDataValue"
    IS 'fieldId_fkey';
COMMENT ON CONSTRAINT "workDataValueWorkId_fkey" ON public."workDataValue"
    IS 'workId_fkey';
-- Index: fki_fieldId_fkey

-- DROP INDEX public."fki_fieldId_fkey";

CREATE INDEX "fki_fieldId_fkey"
    ON public."workDataValue" USING btree
    ("fieldTemplateId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workDataValueArchiveByUserId_fkey

-- DROP INDEX public."fki_workDataValueArchiveByUserId_fkey";

CREATE INDEX "fki_workDataValueArchiveByUserId_fkey"
    ON public."workDataValue" USING btree
    ("archiveByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workDataValueCreatedByUserId_fkey

-- DROP INDEX public."fki_workDataValueCreatedByUserId_fkey";

CREATE INDEX "fki_workDataValueCreatedByUserId_fkey"
    ON public."workDataValue" USING btree
    ("createdByUserId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_workId_fkey

-- DROP INDEX public."fki_workId_fkey";

CREATE INDEX "fki_workId_fkey"
    ON public."workDataValue" USING btree
    ("workId" ASC NULLS LAST)
    TABLESPACE pg_default;