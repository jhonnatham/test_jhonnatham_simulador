\c simulacion 

CREATE SCHEMA simulacion AUTHORIZATION simulacion;

 

/* Drop Tables */

DROP TABLE IF EXISTS simulacion."Configuracion" CASCADE
;

DROP TABLE IF EXISTS simulacion."Simulaciones" CASCADE
;

DROP TABLE IF EXISTS simulacion."Usuarios" CASCADE
;

/* Create Tables */

CREATE TABLE simulacion."Configuracion"
(
	id serial NOT NULL,
	clave varchar(50) NULL,
	valor numeric NULL
);

CREATE TABLE simulacion."Simulaciones"
(
	id serial NOT NULL,
	usuario_id serial NOT NULL,
	monto integer NULL,
	termino_pago bit(1) NULL   DEFAULT 0::bit,	-- 0 -> mensual 1 -> anual
	fecha_inicio timestamp without time zone NULL,
	fecha_fin timestamp without time zone NULL,
	tasa numeric NULL,
	create_at timestamp without time zone NOT NULL   DEFAULT now()
);

CREATE TABLE simulacion."Usuarios"
(
	id serial NOT NULL,	-- Identificador de la tabla
	email varchar(50) NULL,
	password varchar(80) NULL
);

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE simulacion."Configuracion" ADD CONSTRAINT "PK_Configuracion"
	PRIMARY KEY (id)
;

ALTER TABLE simulacion."Simulaciones" ADD CONSTRAINT "PK_Simulaciones"
	PRIMARY KEY (id)
;

CREATE INDEX "IXFK_Simulaciones_Usuarios" ON simulacion."Simulaciones" (usuario_id ASC)
;

ALTER TABLE simulacion."Usuarios" ADD CONSTRAINT "PK_Usuarios"
	PRIMARY KEY (id)
;

/* Create Foreign Key Constraints */

ALTER TABLE simulacion."Simulaciones" ADD CONSTRAINT "FK_Simulaciones_Usuarios"
	FOREIGN KEY (usuario_id) REFERENCES simulacion."Usuarios" (id) ON DELETE No Action ON UPDATE No Action
;

/* Create Table Comments, Sequences for Autonumber Columns */

COMMENT ON COLUMN simulacion."Simulaciones".termino_pago
	IS '0 -> mensual
1 -> anual'
;

 

 

COMMENT ON COLUMN simulacion."Usuarios".id
	IS 'Identificador de la tabla'
;

 
INSERT INTO simulacion."Configuracion" (clave, valor)	VALUES ('MENSUAL', 1.8);
INSERT INTO simulacion."Configuracion" (clave, valor)	VALUES ('ANUAL', 22);