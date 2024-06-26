import { Request } from "express";
import * as passport from "passport";
import { IBaseStrategyOption, VerifyCallback } from "./common";

export interface IOIDCStrategyOption extends IBaseStrategyOption {
    responseType: "code" | "code id_token" | "id_token code" | "id_token";
    responseMode: "query" | "form_post";
    redirectUrl: string;
    allowHttpForRedirectUrl?: boolean | undefined;
    clientSecret?: string | undefined;
    thumbprint?: string | undefined;
    privatePEMKey?: string | undefined;
    useCookieInsteadOfSession?: boolean | undefined;
    cookieEncryptionKeys?: Array<{ key: string; iv: string }> | undefined;
    nonceLifetime?: number | undefined;
    nonceMaxAmount?: number | undefined;
    scope?: string | string[] | undefined;
    cookieSameSite?: boolean | undefined;
}

export interface IOIDCStrategyOptionWithRequest extends IOIDCStrategyOption {
    passReqToCallback: true;
}

export interface IOIDCStrategyOptionWithoutRequest extends IOIDCStrategyOption {
    passReqToCallback: false;
}

export interface IProfile {
    sub?: string | undefined;
    oid?: string | undefined;
    upn?: string | undefined;
    displayName?: string | undefined;
    name?: {
        familyName?: string | undefined;
        givenName?: string | undefined;
        middleName?: string | undefined;
    } | undefined;
    emails?: any;
    _raw?: string | undefined;
    _json?: any;
}

export type VerifyOIDCFunction =
    | ((profile: IProfile, done: VerifyCallback) => void)
    | ((iss: string, sub: string, done: VerifyCallback) => void)
    | ((iss: string, sub: string, profile: IProfile, done: VerifyCallback) => void)
    | ((
        iss: string,
        sub: string,
        profile: IProfile,
        access_token: string,
        refresh_token: string,
        done: VerifyCallback,
    ) => void)
    | ((
        iss: string,
        sub: string,
        profile: IProfile,
        access_token: string,
        refresh_token: string,
        params: any,
        done: VerifyCallback,
    ) => void)
    | ((
        iss: string,
        sub: string,
        profile: IProfile,
        jwtClaims: any,
        access_token: string,
        refresh_token: string,
        params: any,
        done: VerifyCallback,
    ) => void);

export type VerifyOIDCFunctionWithReq =
    | ((req: Request, profile: IProfile, done: VerifyCallback) => void)
    | ((req: Request, iss: string, sub: string, done: VerifyCallback) => void)
    | ((req: Request, iss: string, sub: string, profile: IProfile, done: VerifyCallback) => void)
    | ((
        req: Request,
        iss: string,
        sub: string,
        profile: IProfile,
        access_token: string,
        refresh_token: string,
        done: VerifyCallback,
    ) => void)
    | ((
        req: Request,
        iss: string,
        sub: string,
        profile: IProfile,
        access_token: string,
        refresh_token: string,
        params: any,
        done: VerifyCallback,
    ) => void)
    | ((
        req: Request,
        iss: string,
        sub: string,
        profile: IProfile,
        jwtClaims: any,
        access_token: string,
        refresh_token: string,
        params: any,
        done: VerifyCallback,
    ) => void);

export class OIDCStrategy implements passport.Strategy {
    constructor(
        options: IOIDCStrategyOptionWithRequest,
        verify: VerifyOIDCFunctionWithReq,
    );
    constructor(options: IOIDCStrategyOptionWithoutRequest, verify: VerifyOIDCFunction);

    name: string;

    authenticate(req: Request, options?: object): void;
}
