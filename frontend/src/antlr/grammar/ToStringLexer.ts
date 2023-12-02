// Generated from src/grammar/ToString.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class ToStringLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"LITERAL_VALUE", "LITERAL", "STRING", "TIMEZONE", "WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'{'", "','", "'}'", "'='", "'['", "']'", "'('", "')'", "':'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "LITERAL_VALUE", "LITERAL", "STRING", 
		"WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ToStringLexer._LITERAL_NAMES, ToStringLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ToStringLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(ToStringLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "ToString.g4"; }

	// @Override
	public get ruleNames(): string[] { return ToStringLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return ToStringLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return ToStringLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return ToStringLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x0FT\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t" +
		"\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x07\r8\n\r\f\r" +
		"\x0E\r;\v\r\x03\r\x03\r\x03\r\x07\r@\n\r\f\r\x0E\rC\v\r\x03\r\x05\rF\n" +
		"\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x06\x0FO\n" +
		"\x0F\r\x0F\x0E\x0FP\x03\x0F\x03\x0F\x02\x02\x02\x10\x03\x02\x03\x05\x02" +
		"\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02" +
		"\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x02\x1D\x02\x0F\x03\x02\x06" +
		"\n\x02\"\"*+..??]]__}}\x7F\x7F\x03\x02$$\x03\x02))\x05\x02\v\f\x0F\x0F" +
		"\"\"\x02V\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03" +
		"\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02" +
		"\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02" +
		"\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02" +
		"\x02\x02\x02\x1D\x03\x02\x02\x02\x03\x1F\x03\x02\x02\x02\x05!\x03\x02" +
		"\x02\x02\x07#\x03\x02\x02\x02\t%\x03\x02\x02\x02\v\'\x03\x02\x02\x02\r" +
		")\x03\x02\x02\x02\x0F+\x03\x02\x02\x02\x11-\x03\x02\x02\x02\x13/\x03\x02" +
		"\x02\x02\x151\x03\x02\x02\x02\x173\x03\x02\x02\x02\x19E\x03\x02\x02\x02" +
		"\x1BG\x03\x02\x02\x02\x1DN\x03\x02\x02\x02\x1F \x07}\x02\x02 \x04\x03" +
		"\x02\x02\x02!\"\x07.\x02\x02\"\x06\x03\x02\x02\x02#$\x07\x7F\x02\x02$" +
		"\b\x03\x02\x02\x02%&\x07?\x02\x02&\n\x03\x02\x02\x02\'(\x07]\x02\x02(" +
		"\f\x03\x02\x02\x02)*\x07_\x02\x02*\x0E\x03\x02\x02\x02+,\x07*\x02\x02" +
		",\x10\x03\x02\x02\x02-.\x07+\x02\x02.\x12\x03\x02\x02\x02/0\x07<\x02\x02" +
		"0\x14\x03\x02\x02\x0212\x05\x19\r\x022\x16\x03\x02\x02\x0234\n\x02\x02" +
		"\x024\x18\x03\x02\x02\x0259\x07$\x02\x0268\n\x03\x02\x0276\x03\x02\x02" +
		"\x028;\x03\x02\x02\x0297\x03\x02\x02\x029:\x03\x02\x02\x02:<\x03\x02\x02" +
		"\x02;9\x03\x02\x02\x02<F\x07$\x02\x02=A\x07)\x02\x02>@\n\x04\x02\x02?" +
		">\x03\x02\x02\x02@C\x03\x02\x02\x02A?\x03\x02\x02\x02AB\x03\x02\x02\x02" +
		"BD\x03\x02\x02\x02CA\x03\x02\x02\x02DF\x07)\x02\x02E5\x03\x02\x02\x02" +
		"E=\x03\x02\x02\x02F\x1A\x03\x02\x02\x02GH\x07]\x02\x02HI\x07W\x02\x02" +
		"IJ\x07V\x02\x02JK\x07E\x02\x02KL\x07_\x02\x02L\x1C\x03\x02\x02\x02MO\t" +
		"\x05\x02\x02NM\x03\x02\x02\x02OP\x03\x02\x02\x02PN\x03\x02\x02\x02PQ\x03" +
		"\x02\x02\x02QR\x03\x02\x02\x02RS\b\x0F\x02\x02S\x1E\x03\x02\x02\x02\x07" +
		"\x029AEP\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ToStringLexer.__ATN) {
			ToStringLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ToStringLexer._serializedATN));
		}

		return ToStringLexer.__ATN;
	}

}

