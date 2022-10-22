import ClassReader from "../class-reader";
import AttributeInfo from "./attribute-info";
import { ConstantInfo } from "../constant-info";
import ConstantUtf8Info from "../constant-info/constant-info-utf8";
import CodeAttribute from "./attribute-info-code";
import UnparsedAttribute from "./attribute-info-unparsed";
import ConstantValueAttribute from "./attribute-info-constant-value";
import { DeprecatedAttribute, SyntheticAttribute } from "./attribute-info-marker";
import ExceptionsAttribute from "./attribute-info-exceptions";
import LineNumberTableAttribute from "./attribute-info-line-number-table";
import LocalVariableTableAttribute from "./attribute-info-local-variable-table";
import SourceFileAttribute from "./attribute-info-source-file";

// resolve circular references to typescript files
export default function read(
  classReader: ClassReader,
  constantPool: ConstantInfo[]
): AttributeInfo {
  const attrNameIndex = classReader.readUint16();
  const attrName = (constantPool[attrNameIndex] as ConstantUtf8Info).str; // TODO 抽离函数，使用 instanceof，主动抛错
  const attrLen = classReader.readUint32();

  switch (attrName) {
    case "Code":
      return CodeAttribute.read(classReader, constantPool);
    case "ConstantValue":
      return ConstantValueAttribute.read(classReader);
    case "Deprecated":
      return DeprecatedAttribute.read();
    case "Exceptions":
      return ExceptionsAttribute.read(classReader);
    case "LineNumberTable":
      return LineNumberTableAttribute.read(classReader);
    case "LocalVariableTable":
      return LocalVariableTableAttribute.read(classReader);
    case "SourceFile":
      return SourceFileAttribute.read(classReader);
    case "Synthetic":
      return SyntheticAttribute.read();
    default:
      return UnparsedAttribute.read(classReader, attrName, attrLen);
  }
}
