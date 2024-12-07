-- CreateTable
CREATE TABLE `carnet` (
    `Ncarnet` INTEGER NOT NULL,
    `cedula` INTEGER NOT NULL,
    `fecha_vencimiento` DATETIME(3) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Ncarnet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materia` (
    `MatCodigo` VARCHAR(191) NOT NULL,
    `MatNombre` VARCHAR(191) NOT NULL,
    `MatCreditos` INTEGER NOT NULL,

    PRIMARY KEY (`MatCodigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permisos` (
    `IdPermiso` INTEGER NOT NULL,
    `matCreate` BOOLEAN NOT NULL,
    `matDelete` BOOLEAN NOT NULL,
    `matUpdate` BOOLEAN NOT NULL,
    `UserCreate` BOOLEAN NOT NULL,
    `UserDelete` BOOLEAN NOT NULL,
    `UserUpdate` BOOLEAN NOT NULL,
    `ponderCreate` BOOLEAN NOT NULL,
    `ponderUpdate` BOOLEAN NOT NULL,

    PRIMARY KEY (`IdPermiso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personalData` (
    `cedula` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `cedula` INTEGER NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `Cedula` INTEGER NOT NULL,
    `MatCodigo` VARCHAR(191) NOT NULL,
    `Nota` DOUBLE NOT NULL,

    PRIMARY KEY (`Cedula`, `MatCodigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos` (
    `cedula` INTEGER NOT NULL,
    `idProyecto` INTEGER NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `fecha_upload` DATETIME(3) NOT NULL,
    `urlFile` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cedula`, `idProyecto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_Cedula_fkey` FOREIGN KEY (`Cedula`) REFERENCES `usuario`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_MatCodigo_fkey` FOREIGN KEY (`MatCodigo`) REFERENCES `materia`(`MatCodigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyectos` ADD CONSTRAINT `proyectos_cedula_fkey` FOREIGN KEY (`cedula`) REFERENCES `usuario`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;
