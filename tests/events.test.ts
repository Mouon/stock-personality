import {describe,it,expect,afterEach,vi} from "vitest";
import {NextRequest} from "next/server";
import {POST} from "@/app/api/events/route";
import {GET} from "@/app/api/stats/route";
import {parseEvent,anonymousToken,secureEqual} from "@/lib/analytics";
const payload={type:"share_attempt",stockId:"us-nvda",eventId:"83fbe84c-9d1c-492f-9424-a339ff196b7e",interactionId:"ea8cbfee-f310-4df9-bfe1-530e00b042a3"};
const origin="http://localhost:3017";
function request(body:unknown,headers:Record<string,string>={}){return new NextRequest(`${origin}/api/events`,{method:"POST",headers:{origin,"content-type":"application/json",...headers},body:JSON.stringify(body)});}
afterEach(()=>vi.unstubAllEnvs());
describe("privacy-preserving event validation",()=>{
 it("accepts known events and rejects arbitrary payloads",()=>{expect(parseEvent(payload)).toEqual(payload);for(const invalid of [null,[],{...payload,type:"purchase"},{...payload,stockId:"missing"},{...payload,eventId:"bad"},{...payload,interactionId:undefined},{...payload,answers:[1,2,3]}])expect(parseEvent(invalid)).toBeUndefined();});
 it("remains functional without Redis",async()=>{vi.stubEnv("UPSTASH_REDIS_REST_URL","");vi.stubEnv("UPSTASH_REDIS_REST_TOKEN","");const response=await POST(request(payload));expect(response.status).toBe(200);expect(await response.json()).toEqual({enabled:false,recorded:false});});
 it("rejects cross-origin, non-JSON, overlarge, malformed and invalid data",async()=>{expect((await POST(request(payload,{origin:"https://attacker.example"}))).status).toBe(403);expect((await POST(request(payload,{"sec-fetch-site":"cross-site"}))).status).toBe(403);expect((await POST(request(payload,{"content-type":"text/plain"}))).status).toBe(415);expect((await POST(request({extra:"x".repeat(2000)}))).status).toBe(413);expect((await POST(request({...payload,stockId:"missing"}))).status).toBe(400);const malformed=new NextRequest(`${origin}/api/events`,{method:"POST",headers:{origin,"content-type":"application/json"},body:"{"});expect((await POST(malformed)).status).toBe(400);});
 it("restricts stats to the configured private token",async()=>{vi.stubEnv("ANALYTICS_ADMIN_TOKEN","private-test-value");vi.stubEnv("UPSTASH_REDIS_REST_URL","");expect((await GET(new NextRequest(`${origin}/api/stats`))).status).toBe(401);const response=await GET(new NextRequest(`${origin}/api/stats`,{headers:{authorization:"Bearer private-test-value"}}));expect(await response.json()).toEqual({enabled:false});expect(response.headers.get("cache-control")).toBe("no-store");});
 it("accepts signed anonymous cookies and replaces tampered values",()=>{vi.stubEnv("UPSTASH_REDIS_REST_TOKEN","test-only-signing-key");const token=anonymousToken(undefined);expect(anonymousToken(token.cookie).id).toBe(token.id);expect(anonymousToken(`${token.id}.tampered`).id).not.toBe(token.id);expect(secureEqual("same","same")).toBe(true);expect(secureEqual("one","different")).toBe(false);});
});
