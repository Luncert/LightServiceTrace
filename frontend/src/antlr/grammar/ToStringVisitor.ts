// Generated from src/grammar/ToString.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { DataContext } from "./ToStringParser";
import { MapContext } from "./ToStringParser";
import { MapPairContext } from "./ToStringParser";
import { ArrContext } from "./ToStringParser";
import { ObjContext } from "./ToStringParser";
import { ObjPairContext } from "./ToStringParser";
import { IdentifierContext } from "./ToStringParser";
import { ValueContext } from "./ToStringParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ToStringParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ToStringVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ToStringParser.data`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData?: (ctx: DataContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.map`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMap?: (ctx: MapContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.mapPair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapPair?: (ctx: MapPairContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.arr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArr?: (ctx: ArrContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.obj`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObj?: (ctx: ObjContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.objPair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjPair?: (ctx: ObjPairContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ToStringParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
}

