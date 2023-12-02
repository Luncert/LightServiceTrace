// Generated from src/grammar/ToString.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ToStringListener } from "./ToStringListener";
import { ToStringVisitor } from "./ToStringVisitor";


export class ToStringParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly LITERAL_VALUE = 10;
	public static readonly LITERAL = 11;
	public static readonly STRING = 12;
	public static readonly WS = 13;
	public static readonly RULE_data = 0;
	public static readonly RULE_map = 1;
	public static readonly RULE_mapPair = 2;
	public static readonly RULE_arr = 3;
	public static readonly RULE_obj = 4;
	public static readonly RULE_objPair = 5;
	public static readonly RULE_identifier = 6;
	public static readonly RULE_value = 7;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"data", "map", "mapPair", "arr", "obj", "objPair", "identifier", "value",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'{'", "','", "'}'", "'='", "'['", "']'", "'('", "')'", "':'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "LITERAL_VALUE", "LITERAL", "STRING", 
		"WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ToStringParser._LITERAL_NAMES, ToStringParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ToStringParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ToString.g4"; }

	// @Override
	public get ruleNames(): string[] { return ToStringParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ToStringParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ToStringParser._ATN, this);
	}
	// @RuleVersion(0)
	public data(): DataContext {
		let _localctx: DataContext = new DataContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ToStringParser.RULE_data);
		try {
			this.state = 19;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ToStringParser.T__0:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 16;
				this.map();
				}
				break;
			case ToStringParser.T__4:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 17;
				this.arr();
				}
				break;
			case ToStringParser.LITERAL_VALUE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 18;
				this.obj();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public map(): MapContext {
		let _localctx: MapContext = new MapContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ToStringParser.RULE_map);
		let _la: number;
		try {
			this.state = 34;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 21;
				this.match(ToStringParser.T__0);
				this.state = 22;
				this.mapPair();
				this.state = 27;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ToStringParser.T__1) {
					{
					{
					this.state = 23;
					this.match(ToStringParser.T__1);
					this.state = 24;
					this.mapPair();
					}
					}
					this.state = 29;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 30;
				this.match(ToStringParser.T__2);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 32;
				this.match(ToStringParser.T__0);
				this.state = 33;
				this.match(ToStringParser.T__2);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mapPair(): MapPairContext {
		let _localctx: MapPairContext = new MapPairContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ToStringParser.RULE_mapPair);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			this.value();
			this.state = 37;
			this.match(ToStringParser.T__3);
			this.state = 39;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ToStringParser.T__0) | (1 << ToStringParser.T__4) | (1 << ToStringParser.LITERAL_VALUE))) !== 0)) {
				{
				this.state = 38;
				this.value();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arr(): ArrContext {
		let _localctx: ArrContext = new ArrContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ToStringParser.RULE_arr);
		let _la: number;
		try {
			this.state = 54;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 41;
				this.match(ToStringParser.T__4);
				this.state = 42;
				this.value();
				this.state = 47;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ToStringParser.T__1) {
					{
					{
					this.state = 43;
					this.match(ToStringParser.T__1);
					this.state = 44;
					this.value();
					}
					}
					this.state = 49;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 50;
				this.match(ToStringParser.T__5);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 52;
				this.match(ToStringParser.T__4);
				this.state = 53;
				this.match(ToStringParser.T__5);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public obj(): ObjContext {
		let _localctx: ObjContext = new ObjContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ToStringParser.RULE_obj);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 56;
			this.identifier();
			this.state = 57;
			this.match(ToStringParser.T__6);
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ToStringParser.LITERAL_VALUE) {
				{
				this.state = 58;
				this.objPair();
				this.state = 63;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ToStringParser.T__1) {
					{
					{
					this.state = 59;
					this.match(ToStringParser.T__1);
					this.state = 60;
					this.objPair();
					}
					}
					this.state = 65;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 68;
			this.match(ToStringParser.T__7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public objPair(): ObjPairContext {
		let _localctx: ObjPairContext = new ObjPairContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ToStringParser.RULE_objPair);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this.identifier();
			this.state = 71;
			_la = this._input.LA(1);
			if (!(_la === ToStringParser.T__3 || _la === ToStringParser.T__8)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ToStringParser.T__0) | (1 << ToStringParser.T__4) | (1 << ToStringParser.LITERAL_VALUE))) !== 0)) {
				{
				this.state = 72;
				this.value();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ToStringParser.RULE_identifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 75;
			this.match(ToStringParser.LITERAL_VALUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ToStringParser.RULE_value);
		try {
			this.state = 79;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 77;
				this.data();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 78;
				this.match(ToStringParser.LITERAL_VALUE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0FT\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x03\x02\x05\x02\x16\n\x02\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x07\x03\x1C\n\x03\f\x03\x0E\x03\x1F\v\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03%\n\x03\x03\x04\x03\x04\x03\x04" +
		"\x05\x04*\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x07\x050\n\x05\f\x05\x0E" +
		"\x053\v\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x059\n\x05\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x07\x06@\n\x06\f\x06\x0E\x06C\v\x06\x05\x06" +
		"E\n\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x05\x07L\n\x07\x03\b\x03" +
		"\b\x03\t\x03\t\x05\tR\n\t\x03\t\x02\x02\x02\n\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x02\x03\x04\x02\x06\x06\v\v\x02V\x02" +
		"\x15\x03\x02\x02\x02\x04$\x03\x02\x02\x02\x06&\x03\x02\x02\x02\b8\x03" +
		"\x02\x02\x02\n:\x03\x02\x02\x02\fH\x03\x02\x02\x02\x0EM\x03\x02\x02\x02" +
		"\x10Q\x03\x02\x02\x02\x12\x16\x05\x04\x03\x02\x13\x16\x05\b\x05\x02\x14" +
		"\x16\x05\n\x06\x02\x15\x12\x03\x02\x02\x02\x15\x13\x03\x02\x02\x02\x15" +
		"\x14\x03\x02\x02\x02\x16\x03\x03\x02\x02\x02\x17\x18\x07\x03\x02\x02\x18" +
		"\x1D\x05\x06\x04\x02\x19\x1A\x07\x04\x02\x02\x1A\x1C\x05\x06\x04\x02\x1B" +
		"\x19\x03\x02\x02\x02\x1C\x1F\x03\x02\x02\x02\x1D\x1B\x03\x02\x02\x02\x1D" +
		"\x1E\x03\x02\x02\x02\x1E \x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02 !\x07" +
		"\x05\x02\x02!%\x03\x02\x02\x02\"#\x07\x03\x02\x02#%\x07\x05\x02\x02$\x17" +
		"\x03\x02\x02\x02$\"\x03\x02\x02\x02%\x05\x03\x02\x02\x02&\'\x05\x10\t" +
		"\x02\')\x07\x06\x02\x02(*\x05\x10\t\x02)(\x03\x02\x02\x02)*\x03\x02\x02" +
		"\x02*\x07\x03\x02\x02\x02+,\x07\x07\x02\x02,1\x05\x10\t\x02-.\x07\x04" +
		"\x02\x02.0\x05\x10\t\x02/-\x03\x02\x02\x0203\x03\x02\x02\x021/\x03\x02" +
		"\x02\x0212\x03\x02\x02\x0224\x03\x02\x02\x0231\x03\x02\x02\x0245\x07\b" +
		"\x02\x0259\x03\x02\x02\x0267\x07\x07\x02\x0279\x07\b\x02\x028+\x03\x02" +
		"\x02\x0286\x03\x02\x02\x029\t\x03\x02\x02\x02:;\x05\x0E\b\x02;D\x07\t" +
		"\x02\x02<A\x05\f\x07\x02=>\x07\x04\x02\x02>@\x05\f\x07\x02?=\x03\x02\x02" +
		"\x02@C\x03\x02\x02\x02A?\x03\x02\x02\x02AB\x03\x02\x02\x02BE\x03\x02\x02" +
		"\x02CA\x03\x02\x02\x02D<\x03\x02\x02\x02DE\x03\x02\x02\x02EF\x03\x02\x02" +
		"\x02FG\x07\n\x02\x02G\v\x03\x02\x02\x02HI\x05\x0E\b\x02IK\t\x02\x02\x02" +
		"JL\x05\x10\t\x02KJ\x03\x02\x02\x02KL\x03\x02\x02\x02L\r\x03\x02\x02\x02" +
		"MN\x07\f\x02\x02N\x0F\x03\x02\x02\x02OR\x05\x02\x02\x02PR\x07\f\x02\x02" +
		"QO\x03\x02\x02\x02QP\x03\x02\x02\x02R\x11\x03\x02\x02\x02\f\x15\x1D$)" +
		"18ADKQ";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ToStringParser.__ATN) {
			ToStringParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ToStringParser._serializedATN));
		}

		return ToStringParser.__ATN;
	}

}

export class DataContext extends ParserRuleContext {
	public map(): MapContext | undefined {
		return this.tryGetRuleContext(0, MapContext);
	}
	public arr(): ArrContext | undefined {
		return this.tryGetRuleContext(0, ArrContext);
	}
	public obj(): ObjContext | undefined {
		return this.tryGetRuleContext(0, ObjContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_data; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterData) {
			listener.enterData(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitData) {
			listener.exitData(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitData) {
			return visitor.visitData(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapContext extends ParserRuleContext {
	public mapPair(): MapPairContext[];
	public mapPair(i: number): MapPairContext;
	public mapPair(i?: number): MapPairContext | MapPairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MapPairContext);
		} else {
			return this.getRuleContext(i, MapPairContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_map; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterMap) {
			listener.enterMap(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitMap) {
			listener.exitMap(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitMap) {
			return visitor.visitMap(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapPairContext extends ParserRuleContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_mapPair; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterMapPair) {
			listener.enterMapPair(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitMapPair) {
			listener.exitMapPair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitMapPair) {
			return visitor.visitMapPair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrContext extends ParserRuleContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_arr; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterArr) {
			listener.enterArr(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitArr) {
			listener.exitArr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitArr) {
			return visitor.visitArr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public objPair(): ObjPairContext[];
	public objPair(i: number): ObjPairContext;
	public objPair(i?: number): ObjPairContext | ObjPairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ObjPairContext);
		} else {
			return this.getRuleContext(i, ObjPairContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_obj; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterObj) {
			listener.enterObj(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitObj) {
			listener.exitObj(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitObj) {
			return visitor.visitObj(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjPairContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_objPair; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterObjPair) {
			listener.enterObjPair(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitObjPair) {
			listener.exitObjPair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitObjPair) {
			return visitor.visitObjPair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public LITERAL_VALUE(): TerminalNode { return this.getToken(ToStringParser.LITERAL_VALUE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_identifier; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public data(): DataContext | undefined {
		return this.tryGetRuleContext(0, DataContext);
	}
	public LITERAL_VALUE(): TerminalNode | undefined { return this.tryGetToken(ToStringParser.LITERAL_VALUE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ToStringParser.RULE_value; }
	// @Override
	public enterRule(listener: ToStringListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: ToStringListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ToStringVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


