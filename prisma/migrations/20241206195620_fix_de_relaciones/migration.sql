-- AddForeignKey
ALTER TABLE `carnet` ADD CONSTRAINT `carnet_cedula_fkey` FOREIGN KEY (`cedula`) REFERENCES `usuario`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personalData` ADD CONSTRAINT `personalData_cedula_fkey` FOREIGN KEY (`cedula`) REFERENCES `usuario`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;
