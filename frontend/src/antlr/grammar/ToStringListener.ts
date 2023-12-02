// Generated from src/grammar/ToString.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { DataContext } from "./ToStringParser";
import { MapContext } from "./ToStringParser";
import { MapPairContext } from "./ToStringParser";
import { ArrContext } from "./ToStringParser";
import { ObjContext } from "./ToStringParser";
import { ObjPairContext } from "./ToStringParser";
import { IdentifierContext } from "./ToStringParser";
import { ValueContext } from "./ToStringParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ToStringParser`.
 */
export interface ToStringListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ToStringParser.data`.
	 * @param ctx the parse tree
	 */
	enterData?: (ctx: DataContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.data`.
	 * @param ctx the parse tree
	 */
	exitData?: (ctx: DataContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.map`.
	 * @param ctx the parse tree
	 */
	enterMap?: (ctx: MapContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.map`.
	 * @param ctx the parse tree
	 */
	exitMap?: (ctx: MapContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.mapPair`.
	 * @param ctx the parse tree
	 */
	enterMapPair?: (ctx: MapPairContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.mapPair`.
	 * @param ctx the parse tree
	 */
	exitMapPair?: (ctx: MapPairContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.arr`.
	 * @param ctx the parse tree
	 */
	enterArr?: (ctx: ArrContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.arr`.
	 * @param ctx the parse tree
	 */
	exitArr?: (ctx: ArrContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.obj`.
	 * @param ctx the parse tree
	 */
	enterObj?: (ctx: ObjContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.obj`.
	 * @param ctx the parse tree
	 */
	exitObj?: (ctx: ObjContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.objPair`.
	 * @param ctx the parse tree
	 */
	enterObjPair?: (ctx: ObjPairContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.objPair`.
	 * @param ctx the parse tree
	 */
	exitObjPair?: (ctx: ObjPairContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ToStringParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `ToStringParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
}

