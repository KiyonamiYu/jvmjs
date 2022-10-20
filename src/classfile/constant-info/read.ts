import ClassReader from "../class-reader";
import ConstantInfo from "./constant-info";
import ConstantTag from "./constant-tag";
import {
  ConstantIntegerInfo,
  ConstantLongInfo,
  ConstantFloatInfo,
  ConstantDoubleInfo,
} from "./constant-numeric";
import ConstantUtf8Info from "./constant-info-utf8";
import ConstantStringInfo from "./constant-info-string";
import ConstantClassInfo from "./constant-info-class";
import {
  ConstantFieldrefInfo,
  ConstantInterfaceMethodrefInfo,
  ConstantMethodrefInfo,
} from "./constant-info-memberref";
import ConstantNameAndTypeInfo from "./constant-info-name-and-type";
import {
  ConstantInvokeDynamicInfo,
  ConstantMethodHandleInfo,
  ConstantMethodTypeInfo,
} from "./constant-info-invoke-dynamic";

export default function read(classReader: ClassReader): ConstantInfo {
  const tag = classReader.readUint8();
  switch (tag) {
    case ConstantTag.Integer:
      return ConstantIntegerInfo.read(classReader);
    case ConstantTag.Float:
      return ConstantFloatInfo.read(classReader);
    case ConstantTag.Long:
      return ConstantLongInfo.read(classReader);
    case ConstantTag.Double:
      return ConstantDoubleInfo.read(classReader);
    case ConstantTag.Utf8:
      return ConstantUtf8Info.read(classReader);
    case ConstantTag.String:
      return ConstantStringInfo.read(classReader);
    case ConstantTag.Class:
      return ConstantClassInfo.read(classReader);
    case ConstantTag.Fieldref:
      return ConstantFieldrefInfo.read(classReader);
    case ConstantTag.Methodref:
      return ConstantMethodrefInfo.read(classReader);
    case ConstantTag.InterfaceMethodref:
      return ConstantInterfaceMethodrefInfo.read(classReader);
    case ConstantTag.NameAndType:
      return ConstantNameAndTypeInfo.read(classReader);
    case ConstantTag.MethodType:
      return ConstantMethodTypeInfo.read(classReader);
    case ConstantTag.MethodHandle:
      return ConstantMethodHandleInfo.read(classReader);
    case ConstantTag.InvokeDynamic:
      return ConstantInvokeDynamicInfo.read(classReader);
    default:
      throw new Error("java.lang.ClassFormatError: constant pool tag!");
  }
}
