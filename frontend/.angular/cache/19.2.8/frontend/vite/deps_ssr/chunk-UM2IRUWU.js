import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  INITIAL_CONFIG,
  SERVER_CONTEXT,
  platformServer,
  renderApplication,
  renderModule
} from "./chunk-PEOKQNR7.js";
import {
  Title
} from "./chunk-BGFUS4QR.js";
import {
  APP_BASE_HREF,
  DOCUMENT,
  HashLocationStrategy,
  LOCATION_INITIALIZED,
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
  ViewportScroller
} from "./chunk-F2BJYHSU.js";
import {
  APP_BOOTSTRAP_LISTENER,
  ApplicationRef,
  Attribute,
  ChangeDetectorRef,
  Compiler,
  Component,
  Console,
  ContentChildren,
  DestroyRef,
  Directive,
  ENABLE_ROOT_COMPONENT_BOOTSTRAP,
  ENVIRONMENT_INITIALIZER,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostBinding,
  HostListener,
  InjectFlags,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  LOCALE_ID,
  NgModule,
  NgModuleFactory$1,
  NgZone,
  Optional,
  Output,
  PendingTasksInternal,
  REQUEST,
  REQUEST_CONTEXT,
  RESPONSE_INIT,
  Renderer2,
  RuntimeError,
  SkipSelf,
  Version,
  ViewContainerRef,
  afterNextRender,
  booleanAttribute,
  createEnvironmentInjector,
  inject,
  input,
  isInjectable,
  isNgModule,
  isPromise,
  isStandalone,
  makeEnvironmentProviders,
  performanceMarkFeature,
  provideAppInitializer,
  reflectComponentType,
  require_cjs,
  require_operators,
  resetCompiledComponents,
  runInInjectionContext,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵattribute,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵsanitizeUrlOrResourceUrl
} from "./chunk-FFZVCUAZ.js";
import {
  __async,
  __asyncGenerator,
  __await,
  __forAwait,
  __objRest,
  __spreadProps,
  __spreadValues,
  __superGet,
  __toESM,
  __yieldStar
} from "./chunk-YHCV7DAQ.js";

// node_modules/@angular/router/fesm2022/router-B-Y85L0c.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var PRIMARY_OUTLET = "primary";
var RouteTitleKey = Symbol("RouteTitle");
var ParamsAsMap = class {
  params;
  constructor(params) {
    this.params = params || {};
  }
  has(name) {
    return Object.prototype.hasOwnProperty.call(this.params, name);
  }
  get(name) {
    if (this.has(name)) {
      const v = this.params[name];
      return Array.isArray(v) ? v[0] : v;
    }
    return null;
  }
  getAll(name) {
    if (this.has(name)) {
      const v = this.params[name];
      return Array.isArray(v) ? v : [v];
    }
    return [];
  }
  get keys() {
    return Object.keys(this.params);
  }
};
function convertToParamMap(params) {
  return new ParamsAsMap(params);
}
function defaultUrlMatcher(segments, segmentGroup, route) {
  const parts = route.path.split("/");
  if (parts.length > segments.length) {
    return null;
  }
  if (route.pathMatch === "full" && (segmentGroup.hasChildren() || parts.length < segments.length)) {
    return null;
  }
  const posParams = {};
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const segment = segments[index];
    const isParameter = part[0] === ":";
    if (isParameter) {
      posParams[part.substring(1)] = segment;
    } else if (part !== segment.path) {
      return null;
    }
  }
  return {
    consumed: segments.slice(0, parts.length),
    posParams
  };
}
function shallowEqualArrays(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (!shallowEqual(a[i], b[i])) return false;
  }
  return true;
}
function shallowEqual(a, b) {
  const k1 = a ? getDataKeys(a) : void 0;
  const k2 = b ? getDataKeys(b) : void 0;
  if (!k1 || !k2 || k1.length != k2.length) {
    return false;
  }
  let key;
  for (let i = 0; i < k1.length; i++) {
    key = k1[i];
    if (!equalArraysOrString(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
function getDataKeys(obj) {
  return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function equalArraysOrString(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    const aSorted = [...a].sort();
    const bSorted = [...b].sort();
    return aSorted.every((val, index) => bSorted[index] === val);
  } else {
    return a === b;
  }
}
function last(a) {
  return a.length > 0 ? a[a.length - 1] : null;
}
function wrapIntoObservable(value) {
  if ((0, import_rxjs.isObservable)(value)) {
    return value;
  }
  if (isPromise(value)) {
    return (0, import_rxjs.from)(Promise.resolve(value));
  }
  return (0, import_rxjs.of)(value);
}
var pathCompareMap = {
  "exact": equalSegmentGroups,
  "subset": containsSegmentGroup
};
var paramCompareMap = {
  "exact": equalParams,
  "subset": containsParams,
  "ignored": () => true
};
function containsTree(container2, containee, options) {
  return pathCompareMap[options.paths](container2.root, containee.root, options.matrixParams) && paramCompareMap[options.queryParams](container2.queryParams, containee.queryParams) && !(options.fragment === "exact" && container2.fragment !== containee.fragment);
}
function equalParams(container2, containee) {
  return shallowEqual(container2, containee);
}
function equalSegmentGroups(container2, containee, matrixParams) {
  if (!equalPath(container2.segments, containee.segments)) return false;
  if (!matrixParamsMatch(container2.segments, containee.segments, matrixParams)) {
    return false;
  }
  if (container2.numberOfChildren !== containee.numberOfChildren) return false;
  for (const c in containee.children) {
    if (!container2.children[c]) return false;
    if (!equalSegmentGroups(container2.children[c], containee.children[c], matrixParams)) return false;
  }
  return true;
}
function containsParams(container2, containee) {
  return Object.keys(containee).length <= Object.keys(container2).length && Object.keys(containee).every((key) => equalArraysOrString(container2[key], containee[key]));
}
function containsSegmentGroup(container2, containee, matrixParams) {
  return containsSegmentGroupHelper(container2, containee, containee.segments, matrixParams);
}
function containsSegmentGroupHelper(container2, containee, containeePaths, matrixParams) {
  if (container2.segments.length > containeePaths.length) {
    const current = container2.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths)) return false;
    if (containee.hasChildren()) return false;
    if (!matrixParamsMatch(current, containeePaths, matrixParams)) return false;
    return true;
  } else if (container2.segments.length === containeePaths.length) {
    if (!equalPath(container2.segments, containeePaths)) return false;
    if (!matrixParamsMatch(container2.segments, containeePaths, matrixParams)) return false;
    for (const c in containee.children) {
      if (!container2.children[c]) return false;
      if (!containsSegmentGroup(container2.children[c], containee.children[c], matrixParams)) {
        return false;
      }
    }
    return true;
  } else {
    const current = containeePaths.slice(0, container2.segments.length);
    const next = containeePaths.slice(container2.segments.length);
    if (!equalPath(container2.segments, current)) return false;
    if (!matrixParamsMatch(container2.segments, current, matrixParams)) return false;
    if (!container2.children[PRIMARY_OUTLET]) return false;
    return containsSegmentGroupHelper(container2.children[PRIMARY_OUTLET], containee, next, matrixParams);
  }
}
function matrixParamsMatch(containerPaths, containeePaths, options) {
  return containeePaths.every((containeeSegment, i) => {
    return paramCompareMap[options](containerPaths[i].parameters, containeeSegment.parameters);
  });
}
var UrlTree = class {
  root;
  queryParams;
  fragment;
  /** @internal */
  _queryParamMap;
  constructor(root2 = new UrlSegmentGroup([], {}), queryParams = {}, fragment = null) {
    this.root = root2;
    this.queryParams = queryParams;
    this.fragment = fragment;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (root2.segments.length > 0) {
        throw new RuntimeError(4015, "The root `UrlSegmentGroup` should not contain `segments`. Instead, these segments belong in the `children` so they can be associated with a named outlet.");
      }
    }
  }
  get queryParamMap() {
    this._queryParamMap ??= convertToParamMap(this.queryParams);
    return this._queryParamMap;
  }
  /** @docsNotRequired */
  toString() {
    return DEFAULT_SERIALIZER.serialize(this);
  }
};
var UrlSegmentGroup = class {
  segments;
  children;
  /** The parent node in the url tree */
  parent = null;
  constructor(segments, children) {
    this.segments = segments;
    this.children = children;
    Object.values(children).forEach((v) => v.parent = this);
  }
  /** Whether the segment has child segments */
  hasChildren() {
    return this.numberOfChildren > 0;
  }
  /** Number of child segments */
  get numberOfChildren() {
    return Object.keys(this.children).length;
  }
  /** @docsNotRequired */
  toString() {
    return serializePaths(this);
  }
};
var UrlSegment = class {
  path;
  parameters;
  /** @internal */
  _parameterMap;
  constructor(path2, parameters) {
    this.path = path2;
    this.parameters = parameters;
  }
  get parameterMap() {
    this._parameterMap ??= convertToParamMap(this.parameters);
    return this._parameterMap;
  }
  /** @docsNotRequired */
  toString() {
    return serializePath(this);
  }
};
function equalSegments(as, bs) {
  return equalPath(as, bs) && as.every((a, i) => shallowEqual(a.parameters, bs[i].parameters));
}
function equalPath(as, bs) {
  if (as.length !== bs.length) return false;
  return as.every((a, i) => a.path === bs[i].path);
}
function mapChildrenIntoArray(segment, fn) {
  let res = [];
  Object.entries(segment.children).forEach(([childOutlet, child]) => {
    if (childOutlet === PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  Object.entries(segment.children).forEach(([childOutlet, child]) => {
    if (childOutlet !== PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  return res;
}
var UrlSerializer = class _UrlSerializer {
  static ɵfac = function UrlSerializer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UrlSerializer)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UrlSerializer,
    factory: () => (() => new DefaultUrlSerializer())(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlSerializer, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => new DefaultUrlSerializer()
    }]
  }], null, null);
})();
var DefaultUrlSerializer = class {
  /** Parses a url into a `UrlTree` */
  parse(url) {
    const p = new UrlParser(url);
    return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
  }
  /** Converts a `UrlTree` into a url */
  serialize(tree2) {
    const segment = `/${serializeSegment(tree2.root, true)}`;
    const query = serializeQueryParams(tree2.queryParams);
    const fragment = typeof tree2.fragment === `string` ? `#${encodeUriFragment(tree2.fragment)}` : "";
    return `${segment}${query}${fragment}`;
  }
};
var DEFAULT_SERIALIZER = new DefaultUrlSerializer();
function serializePaths(segment) {
  return segment.segments.map((p) => serializePath(p)).join("/");
}
function serializeSegment(segment, root2) {
  if (!segment.hasChildren()) {
    return serializePaths(segment);
  }
  if (root2) {
    const primary = segment.children[PRIMARY_OUTLET] ? serializeSegment(segment.children[PRIMARY_OUTLET], false) : "";
    const children = [];
    Object.entries(segment.children).forEach(([k, v]) => {
      if (k !== PRIMARY_OUTLET) {
        children.push(`${k}:${serializeSegment(v, false)}`);
      }
    });
    return children.length > 0 ? `${primary}(${children.join("//")})` : primary;
  } else {
    const children = mapChildrenIntoArray(segment, (v, k) => {
      if (k === PRIMARY_OUTLET) {
        return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
      }
      return [`${k}:${serializeSegment(v, false)}`];
    });
    if (Object.keys(segment.children).length === 1 && segment.children[PRIMARY_OUTLET] != null) {
      return `${serializePaths(segment)}/${children[0]}`;
    }
    return `${serializePaths(segment)}/(${children.join("//")})`;
  }
}
function encodeUriString(s) {
  return encodeURIComponent(s).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
}
function encodeUriQuery(s) {
  return encodeUriString(s).replace(/%3B/gi, ";");
}
function encodeUriFragment(s) {
  return encodeURI(s);
}
function encodeUriSegment(s) {
  return encodeUriString(s).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
}
function decode(s) {
  return decodeURIComponent(s);
}
function decodeQuery(s) {
  return decode(s.replace(/\+/g, "%20"));
}
function serializePath(path2) {
  return `${encodeUriSegment(path2.path)}${serializeMatrixParams(path2.parameters)}`;
}
function serializeMatrixParams(params) {
  return Object.entries(params).map(([key, value]) => `;${encodeUriSegment(key)}=${encodeUriSegment(value)}`).join("");
}
function serializeQueryParams(params) {
  const strParams = Object.entries(params).map(([name, value]) => {
    return Array.isArray(value) ? value.map((v) => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join("&") : `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
  }).filter((s) => s);
  return strParams.length ? `?${strParams.join("&")}` : "";
}
var SEGMENT_RE = /^[^\/()?;#]+/;
function matchSegments(str) {
  const match2 = str.match(SEGMENT_RE);
  return match2 ? match2[0] : "";
}
var MATRIX_PARAM_SEGMENT_RE = /^[^\/()?;=#]+/;
function matchMatrixKeySegments(str) {
  const match2 = str.match(MATRIX_PARAM_SEGMENT_RE);
  return match2 ? match2[0] : "";
}
var QUERY_PARAM_RE = /^[^=?&#]+/;
function matchQueryParams(str) {
  const match2 = str.match(QUERY_PARAM_RE);
  return match2 ? match2[0] : "";
}
var QUERY_PARAM_VALUE_RE = /^[^&#]+/;
function matchUrlQueryParamValue(str) {
  const match2 = str.match(QUERY_PARAM_VALUE_RE);
  return match2 ? match2[0] : "";
}
var UrlParser = class {
  url;
  remaining;
  constructor(url) {
    this.url = url;
    this.remaining = url;
  }
  parseRootSegment() {
    this.consumeOptional("/");
    if (this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#")) {
      return new UrlSegmentGroup([], {});
    }
    return new UrlSegmentGroup([], this.parseChildren());
  }
  parseQueryParams() {
    const params = {};
    if (this.consumeOptional("?")) {
      do {
        this.parseQueryParam(params);
      } while (this.consumeOptional("&"));
    }
    return params;
  }
  parseFragment() {
    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
  }
  parseChildren() {
    if (this.remaining === "") {
      return {};
    }
    this.consumeOptional("/");
    const segments = [];
    if (!this.peekStartsWith("(")) {
      segments.push(this.parseSegment());
    }
    while (this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(")) {
      this.capture("/");
      segments.push(this.parseSegment());
    }
    let children = {};
    if (this.peekStartsWith("/(")) {
      this.capture("/");
      children = this.parseParens(true);
    }
    let res = {};
    if (this.peekStartsWith("(")) {
      res = this.parseParens(false);
    }
    if (segments.length > 0 || Object.keys(children).length > 0) {
      res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
    }
    return res;
  }
  // parse a segment with its matrix parameters
  // ie `name;k1=v1;k2`
  parseSegment() {
    const path2 = matchSegments(this.remaining);
    if (path2 === "" && this.peekStartsWith(";")) {
      throw new RuntimeError(4009, (typeof ngDevMode === "undefined" || ngDevMode) && `Empty path url segment cannot have parameters: '${this.remaining}'.`);
    }
    this.capture(path2);
    return new UrlSegment(decode(path2), this.parseMatrixParams());
  }
  parseMatrixParams() {
    const params = {};
    while (this.consumeOptional(";")) {
      this.parseParam(params);
    }
    return params;
  }
  parseParam(params) {
    const key = matchMatrixKeySegments(this.remaining);
    if (!key) {
      return;
    }
    this.capture(key);
    let value = "";
    if (this.consumeOptional("=")) {
      const valueMatch = matchSegments(this.remaining);
      if (valueMatch) {
        value = valueMatch;
        this.capture(value);
      }
    }
    params[decode(key)] = decode(value);
  }
  // Parse a single query parameter `name[=value]`
  parseQueryParam(params) {
    const key = matchQueryParams(this.remaining);
    if (!key) {
      return;
    }
    this.capture(key);
    let value = "";
    if (this.consumeOptional("=")) {
      const valueMatch = matchUrlQueryParamValue(this.remaining);
      if (valueMatch) {
        value = valueMatch;
        this.capture(value);
      }
    }
    const decodedKey = decodeQuery(key);
    const decodedVal = decodeQuery(value);
    if (params.hasOwnProperty(decodedKey)) {
      let currentVal = params[decodedKey];
      if (!Array.isArray(currentVal)) {
        currentVal = [currentVal];
        params[decodedKey] = currentVal;
      }
      currentVal.push(decodedVal);
    } else {
      params[decodedKey] = decodedVal;
    }
  }
  // parse `(a/b//outlet_name:c/d)`
  parseParens(allowPrimary) {
    const segments = {};
    this.capture("(");
    while (!this.consumeOptional(")") && this.remaining.length > 0) {
      const path2 = matchSegments(this.remaining);
      const next = this.remaining[path2.length];
      if (next !== "/" && next !== ")" && next !== ";") {
        throw new RuntimeError(4010, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot parse url '${this.url}'`);
      }
      let outletName = void 0;
      if (path2.indexOf(":") > -1) {
        outletName = path2.slice(0, path2.indexOf(":"));
        this.capture(outletName);
        this.capture(":");
      } else if (allowPrimary) {
        outletName = PRIMARY_OUTLET;
      }
      const children = this.parseChildren();
      segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] : new UrlSegmentGroup([], children);
      this.consumeOptional("//");
    }
    return segments;
  }
  peekStartsWith(str) {
    return this.remaining.startsWith(str);
  }
  // Consumes the prefix when it is present and returns whether it has been consumed
  consumeOptional(str) {
    if (this.peekStartsWith(str)) {
      this.remaining = this.remaining.substring(str.length);
      return true;
    }
    return false;
  }
  capture(str) {
    if (!this.consumeOptional(str)) {
      throw new RuntimeError(4011, (typeof ngDevMode === "undefined" || ngDevMode) && `Expected "${str}".`);
    }
  }
};
function createRoot(rootCandidate) {
  return rootCandidate.segments.length > 0 ? new UrlSegmentGroup([], {
    [PRIMARY_OUTLET]: rootCandidate
  }) : rootCandidate;
}
function squashSegmentGroup(segmentGroup) {
  const newChildren = {};
  for (const [childOutlet, child] of Object.entries(segmentGroup.children)) {
    const childCandidate = squashSegmentGroup(child);
    if (childOutlet === PRIMARY_OUTLET && childCandidate.segments.length === 0 && childCandidate.hasChildren()) {
      for (const [grandChildOutlet, grandChild] of Object.entries(childCandidate.children)) {
        newChildren[grandChildOutlet] = grandChild;
      }
    } else if (childCandidate.segments.length > 0 || childCandidate.hasChildren()) {
      newChildren[childOutlet] = childCandidate;
    }
  }
  const s = new UrlSegmentGroup(segmentGroup.segments, newChildren);
  return mergeTrivialChildren(s);
}
function mergeTrivialChildren(s) {
  if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
    const c = s.children[PRIMARY_OUTLET];
    return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
  }
  return s;
}
function isUrlTree(v) {
  return v instanceof UrlTree;
}
function createUrlTreeFromSnapshot(relativeTo, commands, queryParams = null, fragment = null) {
  const relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeTo);
  return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, queryParams, fragment);
}
function createSegmentGroupFromRoute(route) {
  let targetGroup;
  function createSegmentGroupFromRouteRecursive(currentRoute) {
    const childOutlets = {};
    for (const childSnapshot of currentRoute.children) {
      const root2 = createSegmentGroupFromRouteRecursive(childSnapshot);
      childOutlets[childSnapshot.outlet] = root2;
    }
    const segmentGroup = new UrlSegmentGroup(currentRoute.url, childOutlets);
    if (currentRoute === route) {
      targetGroup = segmentGroup;
    }
    return segmentGroup;
  }
  const rootCandidate = createSegmentGroupFromRouteRecursive(route.root);
  const rootSegmentGroup = createRoot(rootCandidate);
  return targetGroup ?? rootSegmentGroup;
}
function createUrlTreeFromSegmentGroup(relativeTo, commands, queryParams, fragment) {
  let root2 = relativeTo;
  while (root2.parent) {
    root2 = root2.parent;
  }
  if (commands.length === 0) {
    return tree(root2, root2, root2, queryParams, fragment);
  }
  const nav = computeNavigation(commands);
  if (nav.toRoot()) {
    return tree(root2, root2, new UrlSegmentGroup([], {}), queryParams, fragment);
  }
  const position = findStartingPositionForTargetGroup(nav, root2, relativeTo);
  const newSegmentGroup = position.processChildren ? updateSegmentGroupChildren(position.segmentGroup, position.index, nav.commands) : updateSegmentGroup(position.segmentGroup, position.index, nav.commands);
  return tree(root2, position.segmentGroup, newSegmentGroup, queryParams, fragment);
}
function isMatrixParams(command) {
  return typeof command === "object" && command != null && !command.outlets && !command.segmentPath;
}
function isCommandWithOutlets(command) {
  return typeof command === "object" && command != null && command.outlets;
}
function tree(oldRoot, oldSegmentGroup, newSegmentGroup, queryParams, fragment) {
  let qp = {};
  if (queryParams) {
    Object.entries(queryParams).forEach(([name, value]) => {
      qp[name] = Array.isArray(value) ? value.map((v) => `${v}`) : `${value}`;
    });
  }
  let rootCandidate;
  if (oldRoot === oldSegmentGroup) {
    rootCandidate = newSegmentGroup;
  } else {
    rootCandidate = replaceSegment(oldRoot, oldSegmentGroup, newSegmentGroup);
  }
  const newRoot = createRoot(squashSegmentGroup(rootCandidate));
  return new UrlTree(newRoot, qp, fragment);
}
function replaceSegment(current, oldSegment, newSegment) {
  const children = {};
  Object.entries(current.children).forEach(([outletName, c]) => {
    if (c === oldSegment) {
      children[outletName] = newSegment;
    } else {
      children[outletName] = replaceSegment(c, oldSegment, newSegment);
    }
  });
  return new UrlSegmentGroup(current.segments, children);
}
var Navigation = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(isAbsolute2, numberOfDoubleDots, commands) {
    this.isAbsolute = isAbsolute2;
    this.numberOfDoubleDots = numberOfDoubleDots;
    this.commands = commands;
    if (isAbsolute2 && commands.length > 0 && isMatrixParams(commands[0])) {
      throw new RuntimeError(4003, (typeof ngDevMode === "undefined" || ngDevMode) && "Root segment cannot have matrix parameters");
    }
    const cmdWithOutlet = commands.find(isCommandWithOutlets);
    if (cmdWithOutlet && cmdWithOutlet !== last(commands)) {
      throw new RuntimeError(4004, (typeof ngDevMode === "undefined" || ngDevMode) && "{outlets:{}} has to be the last command");
    }
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/";
  }
};
function computeNavigation(commands) {
  if (typeof commands[0] === "string" && commands.length === 1 && commands[0] === "/") {
    return new Navigation(true, 0, commands);
  }
  let numberOfDoubleDots = 0;
  let isAbsolute2 = false;
  const res = commands.reduce((res2, cmd, cmdIdx) => {
    if (typeof cmd === "object" && cmd != null) {
      if (cmd.outlets) {
        const outlets = {};
        Object.entries(cmd.outlets).forEach(([name, commands2]) => {
          outlets[name] = typeof commands2 === "string" ? commands2.split("/") : commands2;
        });
        return [...res2, {
          outlets
        }];
      }
      if (cmd.segmentPath) {
        return [...res2, cmd.segmentPath];
      }
    }
    if (!(typeof cmd === "string")) {
      return [...res2, cmd];
    }
    if (cmdIdx === 0) {
      cmd.split("/").forEach((urlPart, partIndex) => {
        if (partIndex == 0 && urlPart === ".") ;
        else if (partIndex == 0 && urlPart === "") {
          isAbsolute2 = true;
        } else if (urlPart === "..") {
          numberOfDoubleDots++;
        } else if (urlPart != "") {
          res2.push(urlPart);
        }
      });
      return res2;
    }
    return [...res2, cmd];
  }, []);
  return new Navigation(isAbsolute2, numberOfDoubleDots, res);
}
var Position = class {
  segmentGroup;
  processChildren;
  index;
  constructor(segmentGroup, processChildren, index) {
    this.segmentGroup = segmentGroup;
    this.processChildren = processChildren;
    this.index = index;
  }
};
function findStartingPositionForTargetGroup(nav, root2, target) {
  if (nav.isAbsolute) {
    return new Position(root2, true, 0);
  }
  if (!target) {
    return new Position(root2, false, NaN);
  }
  if (target.parent === null) {
    return new Position(target, true, 0);
  }
  const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
  const index = target.segments.length - 1 + modifier;
  return createPositionApplyingDoubleDots(target, index, nav.numberOfDoubleDots);
}
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
  let g = group;
  let ci = index;
  let dd = numberOfDoubleDots;
  while (dd > ci) {
    dd -= ci;
    g = g.parent;
    if (!g) {
      throw new RuntimeError(4005, (typeof ngDevMode === "undefined" || ngDevMode) && "Invalid number of '../'");
    }
    ci = g.segments.length;
  }
  return new Position(g, false, ci - dd);
}
function getOutlets(commands) {
  if (isCommandWithOutlets(commands[0])) {
    return commands[0].outlets;
  }
  return {
    [PRIMARY_OUTLET]: commands
  };
}
function updateSegmentGroup(segmentGroup, startIndex, commands) {
  segmentGroup ??= new UrlSegmentGroup([], {});
  if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
    return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
  }
  const m = prefixedWith(segmentGroup, startIndex, commands);
  const slicedCommands = commands.slice(m.commandIndex);
  if (m.match && m.pathIndex < segmentGroup.segments.length) {
    const g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
    g.children[PRIMARY_OUTLET] = new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
    return updateSegmentGroupChildren(g, 0, slicedCommands);
  } else if (m.match && slicedCommands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else if (m.match && !segmentGroup.hasChildren()) {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  } else if (m.match) {
    return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
  } else {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  }
}
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
  if (commands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else {
    const outlets = getOutlets(commands);
    const children = {};
    if (Object.keys(outlets).some((o) => o !== PRIMARY_OUTLET) && segmentGroup.children[PRIMARY_OUTLET] && segmentGroup.numberOfChildren === 1 && segmentGroup.children[PRIMARY_OUTLET].segments.length === 0) {
      const childrenOfEmptyChild = updateSegmentGroupChildren(segmentGroup.children[PRIMARY_OUTLET], startIndex, commands);
      return new UrlSegmentGroup(segmentGroup.segments, childrenOfEmptyChild.children);
    }
    Object.entries(outlets).forEach(([outlet, commands2]) => {
      if (typeof commands2 === "string") {
        commands2 = [commands2];
      }
      if (commands2 !== null) {
        children[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands2);
      }
    });
    Object.entries(segmentGroup.children).forEach(([childOutlet, child]) => {
      if (outlets[childOutlet] === void 0) {
        children[childOutlet] = child;
      }
    });
    return new UrlSegmentGroup(segmentGroup.segments, children);
  }
}
function prefixedWith(segmentGroup, startIndex, commands) {
  let currentCommandIndex = 0;
  let currentPathIndex = startIndex;
  const noMatch2 = {
    match: false,
    pathIndex: 0,
    commandIndex: 0
  };
  while (currentPathIndex < segmentGroup.segments.length) {
    if (currentCommandIndex >= commands.length) return noMatch2;
    const path2 = segmentGroup.segments[currentPathIndex];
    const command = commands[currentCommandIndex];
    if (isCommandWithOutlets(command)) {
      break;
    }
    const curr = `${command}`;
    const next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
    if (currentPathIndex > 0 && curr === void 0) break;
    if (curr && next && typeof next === "object" && next.outlets === void 0) {
      if (!compare(curr, next, path2)) return noMatch2;
      currentCommandIndex += 2;
    } else {
      if (!compare(curr, {}, path2)) return noMatch2;
      currentCommandIndex++;
    }
    currentPathIndex++;
  }
  return {
    match: true,
    pathIndex: currentPathIndex,
    commandIndex: currentCommandIndex
  };
}
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
  const paths = segmentGroup.segments.slice(0, startIndex);
  let i = 0;
  while (i < commands.length) {
    const command = commands[i];
    if (isCommandWithOutlets(command)) {
      const children = createNewSegmentChildren(command.outlets);
      return new UrlSegmentGroup(paths, children);
    }
    if (i === 0 && isMatrixParams(commands[0])) {
      const p = segmentGroup.segments[startIndex];
      paths.push(new UrlSegment(p.path, stringify(commands[0])));
      i++;
      continue;
    }
    const curr = isCommandWithOutlets(command) ? command.outlets[PRIMARY_OUTLET] : `${command}`;
    const next = i < commands.length - 1 ? commands[i + 1] : null;
    if (curr && next && isMatrixParams(next)) {
      paths.push(new UrlSegment(curr, stringify(next)));
      i += 2;
    } else {
      paths.push(new UrlSegment(curr, {}));
      i++;
    }
  }
  return new UrlSegmentGroup(paths, {});
}
function createNewSegmentChildren(outlets) {
  const children = {};
  Object.entries(outlets).forEach(([outlet, commands]) => {
    if (typeof commands === "string") {
      commands = [commands];
    }
    if (commands !== null) {
      children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
    }
  });
  return children;
}
function stringify(params) {
  const res = {};
  Object.entries(params).forEach(([k, v]) => res[k] = `${v}`);
  return res;
}
function compare(path2, params, segment) {
  return path2 == segment.path && shallowEqual(params, segment.parameters);
}
var IMPERATIVE_NAVIGATION = "imperative";
var EventType;
(function(EventType2) {
  EventType2[EventType2["NavigationStart"] = 0] = "NavigationStart";
  EventType2[EventType2["NavigationEnd"] = 1] = "NavigationEnd";
  EventType2[EventType2["NavigationCancel"] = 2] = "NavigationCancel";
  EventType2[EventType2["NavigationError"] = 3] = "NavigationError";
  EventType2[EventType2["RoutesRecognized"] = 4] = "RoutesRecognized";
  EventType2[EventType2["ResolveStart"] = 5] = "ResolveStart";
  EventType2[EventType2["ResolveEnd"] = 6] = "ResolveEnd";
  EventType2[EventType2["GuardsCheckStart"] = 7] = "GuardsCheckStart";
  EventType2[EventType2["GuardsCheckEnd"] = 8] = "GuardsCheckEnd";
  EventType2[EventType2["RouteConfigLoadStart"] = 9] = "RouteConfigLoadStart";
  EventType2[EventType2["RouteConfigLoadEnd"] = 10] = "RouteConfigLoadEnd";
  EventType2[EventType2["ChildActivationStart"] = 11] = "ChildActivationStart";
  EventType2[EventType2["ChildActivationEnd"] = 12] = "ChildActivationEnd";
  EventType2[EventType2["ActivationStart"] = 13] = "ActivationStart";
  EventType2[EventType2["ActivationEnd"] = 14] = "ActivationEnd";
  EventType2[EventType2["Scroll"] = 15] = "Scroll";
  EventType2[EventType2["NavigationSkipped"] = 16] = "NavigationSkipped";
})(EventType || (EventType = {}));
var RouterEvent = class {
  id;
  url;
  constructor(id, url) {
    this.id = id;
    this.url = url;
  }
};
var NavigationStart = class extends RouterEvent {
  type = EventType.NavigationStart;
  /**
   * Identifies the call or event that triggered the navigation.
   * An `imperative` trigger is a call to `router.navigateByUrl()` or `router.navigate()`.
   *
   * @see {@link NavigationEnd}
   * @see {@link NavigationCancel}
   * @see {@link NavigationError}
   */
  navigationTrigger;
  /**
   * The navigation state that was previously supplied to the `pushState` call,
   * when the navigation is triggered by a `popstate` event. Otherwise null.
   *
   * The state object is defined by `NavigationExtras`, and contains any
   * developer-defined state value, as well as a unique ID that
   * the router assigns to every router transition/navigation.
   *
   * From the perspective of the router, the router never "goes back".
   * When the user clicks on the back button in the browser,
   * a new navigation ID is created.
   *
   * Use the ID in this previous-state object to differentiate between a newly created
   * state and one returned to by a `popstate` event, so that you can restore some
   * remembered state, such as scroll position.
   *
   */
  restoredState;
  constructor(id, url, navigationTrigger = "imperative", restoredState = null) {
    super(id, url);
    this.navigationTrigger = navigationTrigger;
    this.restoredState = restoredState;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
  }
};
var NavigationEnd = class extends RouterEvent {
  urlAfterRedirects;
  type = EventType.NavigationEnd;
  constructor(id, url, urlAfterRedirects) {
    super(id, url);
    this.urlAfterRedirects = urlAfterRedirects;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
  }
};
var NavigationCancellationCode;
(function(NavigationCancellationCode2) {
  NavigationCancellationCode2[NavigationCancellationCode2["Redirect"] = 0] = "Redirect";
  NavigationCancellationCode2[NavigationCancellationCode2["SupersededByNewNavigation"] = 1] = "SupersededByNewNavigation";
  NavigationCancellationCode2[NavigationCancellationCode2["NoDataFromResolver"] = 2] = "NoDataFromResolver";
  NavigationCancellationCode2[NavigationCancellationCode2["GuardRejected"] = 3] = "GuardRejected";
})(NavigationCancellationCode || (NavigationCancellationCode = {}));
var NavigationSkippedCode;
(function(NavigationSkippedCode2) {
  NavigationSkippedCode2[NavigationSkippedCode2["IgnoredSameUrlNavigation"] = 0] = "IgnoredSameUrlNavigation";
  NavigationSkippedCode2[NavigationSkippedCode2["IgnoredByUrlHandlingStrategy"] = 1] = "IgnoredByUrlHandlingStrategy";
})(NavigationSkippedCode || (NavigationSkippedCode = {}));
var NavigationCancel = class extends RouterEvent {
  reason;
  code;
  type = EventType.NavigationCancel;
  constructor(id, url, reason, code) {
    super(id, url);
    this.reason = reason;
    this.code = code;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
  }
};
var NavigationSkipped = class extends RouterEvent {
  reason;
  code;
  type = EventType.NavigationSkipped;
  constructor(id, url, reason, code) {
    super(id, url);
    this.reason = reason;
    this.code = code;
  }
};
var NavigationError = class extends RouterEvent {
  error;
  target;
  type = EventType.NavigationError;
  constructor(id, url, error, target) {
    super(id, url);
    this.error = error;
    this.target = target;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
  }
};
var RoutesRecognized = class extends RouterEvent {
  urlAfterRedirects;
  state;
  type = EventType.RoutesRecognized;
  constructor(id, url, urlAfterRedirects, state) {
    super(id, url);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
  }
  /** @docsNotRequired */
  toString() {
    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
};
var GuardsCheckStart = class extends RouterEvent {
  urlAfterRedirects;
  state;
  type = EventType.GuardsCheckStart;
  constructor(id, url, urlAfterRedirects, state) {
    super(id, url);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
  }
  toString() {
    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
};
var GuardsCheckEnd = class extends RouterEvent {
  urlAfterRedirects;
  state;
  shouldActivate;
  type = EventType.GuardsCheckEnd;
  constructor(id, url, urlAfterRedirects, state, shouldActivate) {
    super(id, url);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
    this.shouldActivate = shouldActivate;
  }
  toString() {
    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
  }
};
var ResolveStart = class extends RouterEvent {
  urlAfterRedirects;
  state;
  type = EventType.ResolveStart;
  constructor(id, url, urlAfterRedirects, state) {
    super(id, url);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
  }
  toString() {
    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
};
var ResolveEnd = class extends RouterEvent {
  urlAfterRedirects;
  state;
  type = EventType.ResolveEnd;
  constructor(id, url, urlAfterRedirects, state) {
    super(id, url);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
  }
  toString() {
    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
};
var RouteConfigLoadStart = class {
  route;
  type = EventType.RouteConfigLoadStart;
  constructor(route) {
    this.route = route;
  }
  toString() {
    return `RouteConfigLoadStart(path: ${this.route.path})`;
  }
};
var RouteConfigLoadEnd = class {
  route;
  type = EventType.RouteConfigLoadEnd;
  constructor(route) {
    this.route = route;
  }
  toString() {
    return `RouteConfigLoadEnd(path: ${this.route.path})`;
  }
};
var ChildActivationStart = class {
  snapshot;
  type = EventType.ChildActivationStart;
  constructor(snapshot) {
    this.snapshot = snapshot;
  }
  toString() {
    const path2 = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ChildActivationStart(path: '${path2}')`;
  }
};
var ChildActivationEnd = class {
  snapshot;
  type = EventType.ChildActivationEnd;
  constructor(snapshot) {
    this.snapshot = snapshot;
  }
  toString() {
    const path2 = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ChildActivationEnd(path: '${path2}')`;
  }
};
var ActivationStart = class {
  snapshot;
  type = EventType.ActivationStart;
  constructor(snapshot) {
    this.snapshot = snapshot;
  }
  toString() {
    const path2 = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ActivationStart(path: '${path2}')`;
  }
};
var ActivationEnd = class {
  snapshot;
  type = EventType.ActivationEnd;
  constructor(snapshot) {
    this.snapshot = snapshot;
  }
  toString() {
    const path2 = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ActivationEnd(path: '${path2}')`;
  }
};
var Scroll = class {
  routerEvent;
  position;
  anchor;
  type = EventType.Scroll;
  constructor(routerEvent, position, anchor) {
    this.routerEvent = routerEvent;
    this.position = position;
    this.anchor = anchor;
  }
  toString() {
    const pos = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
    return `Scroll(anchor: '${this.anchor}', position: '${pos}')`;
  }
};
var BeforeActivateRoutes = class {
};
var RedirectRequest = class {
  url;
  navigationBehaviorOptions;
  constructor(url, navigationBehaviorOptions) {
    this.url = url;
    this.navigationBehaviorOptions = navigationBehaviorOptions;
  }
};
function stringifyEvent(routerEvent) {
  switch (routerEvent.type) {
    case EventType.ActivationEnd:
      return `ActivationEnd(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.ActivationStart:
      return `ActivationStart(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.ChildActivationEnd:
      return `ChildActivationEnd(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.ChildActivationStart:
      return `ChildActivationStart(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.GuardsCheckEnd:
      return `GuardsCheckEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state}, shouldActivate: ${routerEvent.shouldActivate})`;
    case EventType.GuardsCheckStart:
      return `GuardsCheckStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.NavigationCancel:
      return `NavigationCancel(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
    case EventType.NavigationSkipped:
      return `NavigationSkipped(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
    case EventType.NavigationEnd:
      return `NavigationEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}')`;
    case EventType.NavigationError:
      return `NavigationError(id: ${routerEvent.id}, url: '${routerEvent.url}', error: ${routerEvent.error})`;
    case EventType.NavigationStart:
      return `NavigationStart(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
    case EventType.ResolveEnd:
      return `ResolveEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.ResolveStart:
      return `ResolveStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.RouteConfigLoadEnd:
      return `RouteConfigLoadEnd(path: ${routerEvent.route.path})`;
    case EventType.RouteConfigLoadStart:
      return `RouteConfigLoadStart(path: ${routerEvent.route.path})`;
    case EventType.RoutesRecognized:
      return `RoutesRecognized(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.Scroll:
      const pos = routerEvent.position ? `${routerEvent.position[0]}, ${routerEvent.position[1]}` : null;
      return `Scroll(anchor: '${routerEvent.anchor}', position: '${pos}')`;
  }
}
function getOrCreateRouteInjectorIfNeeded(route, currentInjector) {
  if (route.providers && !route._injector) {
    route._injector = createEnvironmentInjector(route.providers, currentInjector, `Route: ${route.path}`);
  }
  return route._injector ?? currentInjector;
}
function validateConfig(config, parentPath = "", requireStandaloneComponents = false) {
  for (let i = 0; i < config.length; i++) {
    const route = config[i];
    const fullPath = getFullPath(parentPath, route);
    validateNode(route, fullPath, requireStandaloneComponents);
  }
}
function assertStandalone(fullPath, component) {
  if (component && isNgModule(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. You are using 'loadComponent' with a module, but it must be used with standalone components. Use 'loadChildren' instead.`);
  } else if (component && !isStandalone(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. The component must be standalone.`);
  }
}
function validateNode(route, fullPath, requireStandaloneComponents) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!route) {
      throw new RuntimeError(4014, `
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
    }
    if (Array.isArray(route)) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': Array cannot be specified`);
    }
    if (!route.redirectTo && !route.component && !route.loadComponent && !route.children && !route.loadChildren && route.outlet && route.outlet !== PRIMARY_OUTLET) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
    }
    if (route.redirectTo && route.children) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
    }
    if (route.redirectTo && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
    }
    if (route.children && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
    }
    if (route.redirectTo && (route.component || route.loadComponent)) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and component/loadComponent cannot be used together`);
    }
    if (route.component && route.loadComponent) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': component and loadComponent cannot be used together`);
    }
    if (route.redirectTo && route.canActivate) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and canActivate cannot be used together. Redirects happen before activation so canActivate will never be executed.`);
    }
    if (route.path && route.matcher) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
    }
    if (route.redirectTo === void 0 && !route.component && !route.loadComponent && !route.children && !route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
    }
    if (route.path === void 0 && route.matcher === void 0) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
    }
    if (typeof route.path === "string" && route.path.charAt(0) === "/") {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path cannot start with a slash`);
    }
    if (route.path === "" && route.redirectTo !== void 0 && route.pathMatch === void 0) {
      const exp = `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
      throw new RuntimeError(4014, `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
    }
    if (requireStandaloneComponents) {
      assertStandalone(fullPath, route.component);
    }
  }
  if (route.children) {
    validateConfig(route.children, fullPath, requireStandaloneComponents);
  }
}
function getFullPath(parentPath, currentRoute) {
  if (!currentRoute) {
    return parentPath;
  }
  if (!parentPath && !currentRoute.path) {
    return "";
  } else if (parentPath && !currentRoute.path) {
    return `${parentPath}/`;
  } else if (!parentPath && currentRoute.path) {
    return currentRoute.path;
  } else {
    return `${parentPath}/${currentRoute.path}`;
  }
}
function getOutlet(route) {
  return route.outlet || PRIMARY_OUTLET;
}
function sortByMatchingOutlets(routes, outletName) {
  const sortedConfig = routes.filter((r) => getOutlet(r) === outletName);
  sortedConfig.push(...routes.filter((r) => getOutlet(r) !== outletName));
  return sortedConfig;
}
function getClosestRouteInjector(snapshot) {
  if (!snapshot) return null;
  if (snapshot.routeConfig?._injector) {
    return snapshot.routeConfig._injector;
  }
  for (let s = snapshot.parent; s; s = s.parent) {
    const route = s.routeConfig;
    if (route?._loadedInjector) return route._loadedInjector;
    if (route?._injector) return route._injector;
  }
  return null;
}
var OutletContext = class {
  rootInjector;
  outlet = null;
  route = null;
  children;
  attachRef = null;
  get injector() {
    return getClosestRouteInjector(this.route?.snapshot) ?? this.rootInjector;
  }
  constructor(rootInjector) {
    this.rootInjector = rootInjector;
    this.children = new ChildrenOutletContexts(this.rootInjector);
  }
};
var ChildrenOutletContexts = class _ChildrenOutletContexts {
  rootInjector;
  // contexts for child outlets, by name.
  contexts = /* @__PURE__ */ new Map();
  /** @nodoc */
  constructor(rootInjector) {
    this.rootInjector = rootInjector;
  }
  /** Called when a `RouterOutlet` directive is instantiated */
  onChildOutletCreated(childName, outlet) {
    const context = this.getOrCreateContext(childName);
    context.outlet = outlet;
    this.contexts.set(childName, context);
  }
  /**
   * Called when a `RouterOutlet` directive is destroyed.
   * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
   * re-created later.
   */
  onChildOutletDestroyed(childName) {
    const context = this.getContext(childName);
    if (context) {
      context.outlet = null;
      context.attachRef = null;
    }
  }
  /**
   * Called when the corresponding route is deactivated during navigation.
   * Because the component get destroyed, all children outlet are destroyed.
   */
  onOutletDeactivated() {
    const contexts = this.contexts;
    this.contexts = /* @__PURE__ */ new Map();
    return contexts;
  }
  onOutletReAttached(contexts) {
    this.contexts = contexts;
  }
  getOrCreateContext(childName) {
    let context = this.getContext(childName);
    if (!context) {
      context = new OutletContext(this.rootInjector);
      this.contexts.set(childName, context);
    }
    return context;
  }
  getContext(childName) {
    return this.contexts.get(childName) || null;
  }
  static ɵfac = function ChildrenOutletContexts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChildrenOutletContexts)(ɵɵinject(EnvironmentInjector));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ChildrenOutletContexts,
    factory: _ChildrenOutletContexts.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChildrenOutletContexts, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: EnvironmentInjector
  }], null);
})();
var Tree = class {
  /** @internal */
  _root;
  constructor(root2) {
    this._root = root2;
  }
  get root() {
    return this._root.value;
  }
  /**
   * @internal
   */
  parent(t) {
    const p = this.pathFromRoot(t);
    return p.length > 1 ? p[p.length - 2] : null;
  }
  /**
   * @internal
   */
  children(t) {
    const n = findNode(t, this._root);
    return n ? n.children.map((t2) => t2.value) : [];
  }
  /**
   * @internal
   */
  firstChild(t) {
    const n = findNode(t, this._root);
    return n && n.children.length > 0 ? n.children[0].value : null;
  }
  /**
   * @internal
   */
  siblings(t) {
    const p = findPath(t, this._root);
    if (p.length < 2) return [];
    const c = p[p.length - 2].children.map((c2) => c2.value);
    return c.filter((cc) => cc !== t);
  }
  /**
   * @internal
   */
  pathFromRoot(t) {
    return findPath(t, this._root).map((s) => s.value);
  }
};
function findNode(value, node2) {
  if (value === node2.value) return node2;
  for (const child of node2.children) {
    const node3 = findNode(value, child);
    if (node3) return node3;
  }
  return null;
}
function findPath(value, node2) {
  if (value === node2.value) return [node2];
  for (const child of node2.children) {
    const path2 = findPath(value, child);
    if (path2.length) {
      path2.unshift(node2);
      return path2;
    }
  }
  return [];
}
var TreeNode = class {
  value;
  children;
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function nodeChildrenAsMap(node2) {
  const map2 = {};
  if (node2) {
    node2.children.forEach((child) => map2[child.value.outlet] = child);
  }
  return map2;
}
var RouterState = class extends Tree {
  snapshot;
  /** @internal */
  constructor(root2, snapshot) {
    super(root2);
    this.snapshot = snapshot;
    setRouterState(this, root2);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function createEmptyState(rootComponent) {
  const snapshot = createEmptyStateSnapshot(rootComponent);
  const emptyUrl = new import_rxjs.BehaviorSubject([new UrlSegment("", {})]);
  const emptyParams = new import_rxjs.BehaviorSubject({});
  const emptyData = new import_rxjs.BehaviorSubject({});
  const emptyQueryParams = new import_rxjs.BehaviorSubject({});
  const fragment = new import_rxjs.BehaviorSubject("");
  const activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
  activated.snapshot = snapshot.root;
  return new RouterState(new TreeNode(activated, []), snapshot);
}
function createEmptyStateSnapshot(rootComponent) {
  const emptyParams = {};
  const emptyData = {};
  const emptyQueryParams = {};
  const fragment = "";
  const activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, {});
  return new RouterStateSnapshot("", new TreeNode(activated, []));
}
var ActivatedRoute = class {
  urlSubject;
  paramsSubject;
  queryParamsSubject;
  fragmentSubject;
  dataSubject;
  outlet;
  component;
  /** The current snapshot of this route */
  snapshot;
  /** @internal */
  _futureSnapshot;
  /** @internal */
  _routerState;
  /** @internal */
  _paramMap;
  /** @internal */
  _queryParamMap;
  /** An Observable of the resolved route title */
  title;
  /** An observable of the URL segments matched by this route. */
  url;
  /** An observable of the matrix parameters scoped to this route. */
  params;
  /** An observable of the query parameters shared by all the routes. */
  queryParams;
  /** An observable of the URL fragment shared by all the routes. */
  fragment;
  /** An observable of the static and resolved data of this route. */
  data;
  /** @internal */
  constructor(urlSubject, paramsSubject, queryParamsSubject, fragmentSubject, dataSubject, outlet, component, futureSnapshot) {
    this.urlSubject = urlSubject;
    this.paramsSubject = paramsSubject;
    this.queryParamsSubject = queryParamsSubject;
    this.fragmentSubject = fragmentSubject;
    this.dataSubject = dataSubject;
    this.outlet = outlet;
    this.component = component;
    this._futureSnapshot = futureSnapshot;
    this.title = this.dataSubject?.pipe((0, import_operators.map)((d) => d[RouteTitleKey])) ?? (0, import_rxjs.of)(void 0);
    this.url = urlSubject;
    this.params = paramsSubject;
    this.queryParams = queryParamsSubject;
    this.fragment = fragmentSubject;
    this.data = dataSubject;
  }
  /** The configuration used to match this route. */
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  /** The root of the router state. */
  get root() {
    return this._routerState.root;
  }
  /** The parent of this route in the router state tree. */
  get parent() {
    return this._routerState.parent(this);
  }
  /** The first child of this route in the router state tree. */
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  /** The children of this route in the router state tree. */
  get children() {
    return this._routerState.children(this);
  }
  /** The path from the root of the router state tree to this route. */
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  /**
   * An Observable that contains a map of the required and optional parameters
   * specific to the route.
   * The map supports retrieving single and multiple values from the same parameter.
   */
  get paramMap() {
    this._paramMap ??= this.params.pipe((0, import_operators.map)((p) => convertToParamMap(p)));
    return this._paramMap;
  }
  /**
   * An Observable that contains a map of the query parameters available to all routes.
   * The map supports retrieving single and multiple values from the query parameter.
   */
  get queryParamMap() {
    this._queryParamMap ??= this.queryParams.pipe((0, import_operators.map)((p) => convertToParamMap(p)));
    return this._queryParamMap;
  }
  toString() {
    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
  }
};
function getInherited(route, parent, paramsInheritanceStrategy = "emptyOnly") {
  let inherited;
  const {
    routeConfig
  } = route;
  if (parent !== null && (paramsInheritanceStrategy === "always" || // inherit parent data if route is empty path
  routeConfig?.path === "" || // inherit parent data if parent was componentless
  !parent.component && !parent.routeConfig?.loadComponent)) {
    inherited = {
      params: __spreadValues(__spreadValues({}, parent.params), route.params),
      data: __spreadValues(__spreadValues({}, parent.data), route.data),
      resolve: __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, route.data), parent.data), routeConfig?.data), route._resolvedData)
    };
  } else {
    inherited = {
      params: __spreadValues({}, route.params),
      data: __spreadValues({}, route.data),
      resolve: __spreadValues(__spreadValues({}, route.data), route._resolvedData ?? {})
    };
  }
  if (routeConfig && hasStaticTitle(routeConfig)) {
    inherited.resolve[RouteTitleKey] = routeConfig.title;
  }
  return inherited;
}
var ActivatedRouteSnapshot = class {
  url;
  params;
  queryParams;
  fragment;
  data;
  outlet;
  component;
  /** The configuration used to match this route **/
  routeConfig;
  /** @internal */
  _resolve;
  /** @internal */
  _resolvedData;
  /** @internal */
  _routerState;
  /** @internal */
  _paramMap;
  /** @internal */
  _queryParamMap;
  /** The resolved route title */
  get title() {
    return this.data?.[RouteTitleKey];
  }
  /** @internal */
  constructor(url, params, queryParams, fragment, data, outlet, component, routeConfig, resolve2) {
    this.url = url;
    this.params = params;
    this.queryParams = queryParams;
    this.fragment = fragment;
    this.data = data;
    this.outlet = outlet;
    this.component = component;
    this.routeConfig = routeConfig;
    this._resolve = resolve2;
  }
  /** The root of the router state */
  get root() {
    return this._routerState.root;
  }
  /** The parent of this route in the router state tree */
  get parent() {
    return this._routerState.parent(this);
  }
  /** The first child of this route in the router state tree */
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  /** The children of this route in the router state tree */
  get children() {
    return this._routerState.children(this);
  }
  /** The path from the root of the router state tree to this route */
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    this._paramMap ??= convertToParamMap(this.params);
    return this._paramMap;
  }
  get queryParamMap() {
    this._queryParamMap ??= convertToParamMap(this.queryParams);
    return this._queryParamMap;
  }
  toString() {
    const url = this.url.map((segment) => segment.toString()).join("/");
    const matched = this.routeConfig ? this.routeConfig.path : "";
    return `Route(url:'${url}', path:'${matched}')`;
  }
};
var RouterStateSnapshot = class extends Tree {
  url;
  /** @internal */
  constructor(url, root2) {
    super(root2);
    this.url = url;
    setRouterState(this, root2);
  }
  toString() {
    return serializeNode(this._root);
  }
};
function setRouterState(state, node2) {
  node2.value._routerState = state;
  node2.children.forEach((c) => setRouterState(state, c));
}
function serializeNode(node2) {
  const c = node2.children.length > 0 ? ` { ${node2.children.map(serializeNode).join(", ")} } ` : "";
  return `${node2.value}${c}`;
}
function advanceActivatedRoute(route) {
  if (route.snapshot) {
    const currentSnapshot = route.snapshot;
    const nextSnapshot = route._futureSnapshot;
    route.snapshot = nextSnapshot;
    if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
      route.queryParamsSubject.next(nextSnapshot.queryParams);
    }
    if (currentSnapshot.fragment !== nextSnapshot.fragment) {
      route.fragmentSubject.next(nextSnapshot.fragment);
    }
    if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
      route.paramsSubject.next(nextSnapshot.params);
    }
    if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
      route.urlSubject.next(nextSnapshot.url);
    }
    if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
      route.dataSubject.next(nextSnapshot.data);
    }
  } else {
    route.snapshot = route._futureSnapshot;
    route.dataSubject.next(route._futureSnapshot.data);
  }
}
function equalParamsAndUrlSegments(a, b) {
  const equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
  const parentsMismatch = !a.parent !== !b.parent;
  return equalUrlParams && !parentsMismatch && (!a.parent || equalParamsAndUrlSegments(a.parent, b.parent));
}
function hasStaticTitle(config) {
  return typeof config.title === "string" || config.title === null;
}
var ROUTER_OUTLET_DATA = new InjectionToken(ngDevMode ? "RouterOutlet data" : "");
var RouterOutlet = class _RouterOutlet {
  activated = null;
  /** @internal */
  get activatedComponentRef() {
    return this.activated;
  }
  _activatedRoute = null;
  /**
   * The name of the outlet
   *
   */
  name = PRIMARY_OUTLET;
  activateEvents = new EventEmitter();
  deactivateEvents = new EventEmitter();
  /**
   * Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
   * previously detached subtree.
   **/
  attachEvents = new EventEmitter();
  /**
   * Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
   * subtree.
   */
  detachEvents = new EventEmitter();
  /**
   * Data that will be provided to the child injector through the `ROUTER_OUTLET_DATA` token.
   *
   * When unset, the value of the token is `undefined` by default.
   */
  routerOutletData = input(void 0);
  parentContexts = inject(ChildrenOutletContexts);
  location = inject(ViewContainerRef);
  changeDetector = inject(ChangeDetectorRef);
  inputBinder = inject(INPUT_BINDER, {
    optional: true
  });
  /** @nodoc */
  supportsBindingToComponentInputs = true;
  /** @nodoc */
  ngOnChanges(changes) {
    if (changes["name"]) {
      const {
        firstChange,
        previousValue
      } = changes["name"];
      if (firstChange) {
        return;
      }
      if (this.isTrackedInParentContexts(previousValue)) {
        this.deactivate();
        this.parentContexts.onChildOutletDestroyed(previousValue);
      }
      this.initializeOutletWithName();
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this.isTrackedInParentContexts(this.name)) {
      this.parentContexts.onChildOutletDestroyed(this.name);
    }
    this.inputBinder?.unsubscribeFromRouteData(this);
  }
  isTrackedInParentContexts(outletName) {
    return this.parentContexts.getContext(outletName)?.outlet === this;
  }
  /** @nodoc */
  ngOnInit() {
    this.initializeOutletWithName();
  }
  initializeOutletWithName() {
    this.parentContexts.onChildOutletCreated(this.name, this);
    if (this.activated) {
      return;
    }
    const context = this.parentContexts.getContext(this.name);
    if (context?.route) {
      if (context.attachRef) {
        this.attach(context.attachRef, context.route);
      } else {
        this.activateWith(context.route, context.injector);
      }
    }
  }
  get isActivated() {
    return !!this.activated;
  }
  /**
   * @returns The currently activated component instance.
   * @throws An error if the outlet is not activated.
   */
  get component() {
    if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
    return this.activated.instance;
  }
  get activatedRoute() {
    if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
    return this._activatedRoute;
  }
  get activatedRouteData() {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }
  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach() {
    if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
    this.location.detach();
    const cmp = this.activated;
    this.activated = null;
    this._activatedRoute = null;
    this.detachEvents.emit(cmp.instance);
    return cmp;
  }
  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  attach(ref, activatedRoute) {
    this.activated = ref;
    this._activatedRoute = activatedRoute;
    this.location.insert(ref.hostView);
    this.inputBinder?.bindActivatedRouteToOutletComponent(this);
    this.attachEvents.emit(ref.instance);
  }
  deactivate() {
    if (this.activated) {
      const c = this.component;
      this.activated.destroy();
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }
  activateWith(activatedRoute, environmentInjector) {
    if (this.isActivated) {
      throw new RuntimeError(4013, (typeof ngDevMode === "undefined" || ngDevMode) && "Cannot activate an already activated outlet");
    }
    this._activatedRoute = activatedRoute;
    const location = this.location;
    const snapshot = activatedRoute.snapshot;
    const component = snapshot.component;
    const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
    const injector = new OutletInjector(activatedRoute, childContexts, location.injector, this.routerOutletData);
    this.activated = location.createComponent(component, {
      index: location.length,
      injector,
      environmentInjector
    });
    this.changeDetector.markForCheck();
    this.inputBinder?.bindActivatedRouteToOutletComponent(this);
    this.activateEvents.emit(this.activated.instance);
  }
  static ɵfac = function RouterOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouterOutlet)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _RouterOutlet,
    selectors: [["router-outlet"]],
    inputs: {
      name: "name",
      routerOutletData: [1, "routerOutletData"]
    },
    outputs: {
      activateEvents: "activate",
      deactivateEvents: "deactivate",
      attachEvents: "attach",
      detachEvents: "detach"
    },
    exportAs: ["outlet"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterOutlet, [{
    type: Directive,
    args: [{
      selector: "router-outlet",
      exportAs: "outlet"
    }]
  }], null, {
    name: [{
      type: Input
    }],
    activateEvents: [{
      type: Output,
      args: ["activate"]
    }],
    deactivateEvents: [{
      type: Output,
      args: ["deactivate"]
    }],
    attachEvents: [{
      type: Output,
      args: ["attach"]
    }],
    detachEvents: [{
      type: Output,
      args: ["detach"]
    }]
  });
})();
var OutletInjector = class {
  route;
  childContexts;
  parent;
  outletData;
  constructor(route, childContexts, parent, outletData) {
    this.route = route;
    this.childContexts = childContexts;
    this.parent = parent;
    this.outletData = outletData;
  }
  get(token, notFoundValue) {
    if (token === ActivatedRoute) {
      return this.route;
    }
    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }
    if (token === ROUTER_OUTLET_DATA) {
      return this.outletData;
    }
    return this.parent.get(token, notFoundValue);
  }
};
var INPUT_BINDER = new InjectionToken("");
var RoutedComponentInputBinder = class _RoutedComponentInputBinder {
  outletDataSubscriptions = /* @__PURE__ */ new Map();
  bindActivatedRouteToOutletComponent(outlet) {
    this.unsubscribeFromRouteData(outlet);
    this.subscribeToRouteData(outlet);
  }
  unsubscribeFromRouteData(outlet) {
    this.outletDataSubscriptions.get(outlet)?.unsubscribe();
    this.outletDataSubscriptions.delete(outlet);
  }
  subscribeToRouteData(outlet) {
    const {
      activatedRoute
    } = outlet;
    const dataSubscription = (0, import_rxjs.combineLatest)([activatedRoute.queryParams, activatedRoute.params, activatedRoute.data]).pipe((0, import_operators.switchMap)(([queryParams, params, data], index) => {
      data = __spreadValues(__spreadValues(__spreadValues({}, queryParams), params), data);
      if (index === 0) {
        return (0, import_rxjs.of)(data);
      }
      return Promise.resolve(data);
    })).subscribe((data) => {
      if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
        this.unsubscribeFromRouteData(outlet);
        return;
      }
      const mirror = reflectComponentType(activatedRoute.component);
      if (!mirror) {
        this.unsubscribeFromRouteData(outlet);
        return;
      }
      for (const {
        templateName
      } of mirror.inputs) {
        outlet.activatedComponentRef.setInput(templateName, data[templateName]);
      }
    });
    this.outletDataSubscriptions.set(outlet, dataSubscription);
  }
  static ɵfac = function RoutedComponentInputBinder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoutedComponentInputBinder)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RoutedComponentInputBinder,
    factory: _RoutedComponentInputBinder.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoutedComponentInputBinder, [{
    type: Injectable
  }], null, null);
})();
function createRouterState(routeReuseStrategy, curr, prevState) {
  const root2 = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : void 0);
  return new RouterState(root2, curr);
}
function createNode(routeReuseStrategy, curr, prevState) {
  if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
    const value = prevState.value;
    value._futureSnapshot = curr.value;
    const children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
    return new TreeNode(value, children);
  } else {
    if (routeReuseStrategy.shouldAttach(curr.value)) {
      const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
      if (detachedRouteHandle !== null) {
        const tree2 = detachedRouteHandle.route;
        tree2.value._futureSnapshot = curr.value;
        tree2.children = curr.children.map((c) => createNode(routeReuseStrategy, c));
        return tree2;
      }
    }
    const value = createActivatedRoute(curr.value);
    const children = curr.children.map((c) => createNode(routeReuseStrategy, c));
    return new TreeNode(value, children);
  }
}
function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
  return curr.children.map((child) => {
    for (const p of prevState.children) {
      if (routeReuseStrategy.shouldReuseRoute(child.value, p.value.snapshot)) {
        return createNode(routeReuseStrategy, child, p);
      }
    }
    return createNode(routeReuseStrategy, child);
  });
}
function createActivatedRoute(c) {
  return new ActivatedRoute(new import_rxjs.BehaviorSubject(c.url), new import_rxjs.BehaviorSubject(c.params), new import_rxjs.BehaviorSubject(c.queryParams), new import_rxjs.BehaviorSubject(c.fragment), new import_rxjs.BehaviorSubject(c.data), c.outlet, c.component, c);
}
var RedirectCommand = class {
  redirectTo;
  navigationBehaviorOptions;
  constructor(redirectTo, navigationBehaviorOptions) {
    this.redirectTo = redirectTo;
    this.navigationBehaviorOptions = navigationBehaviorOptions;
  }
};
var NAVIGATION_CANCELING_ERROR = "ngNavigationCancelingError";
function redirectingNavigationError(urlSerializer, redirect) {
  const {
    redirectTo,
    navigationBehaviorOptions
  } = isUrlTree(redirect) ? {
    redirectTo: redirect,
    navigationBehaviorOptions: void 0
  } : redirect;
  const error = navigationCancelingError(ngDevMode && `Redirecting to "${urlSerializer.serialize(redirectTo)}"`, NavigationCancellationCode.Redirect);
  error.url = redirectTo;
  error.navigationBehaviorOptions = navigationBehaviorOptions;
  return error;
}
function navigationCancelingError(message, code) {
  const error = new Error(`NavigationCancelingError: ${message || ""}`);
  error[NAVIGATION_CANCELING_ERROR] = true;
  error.cancellationCode = code;
  return error;
}
function isRedirectingNavigationCancelingError(error) {
  return isNavigationCancelingError(error) && isUrlTree(error.url);
}
function isNavigationCancelingError(error) {
  return !!error && error[NAVIGATION_CANCELING_ERROR];
}
var warnedAboutUnsupportedInputBinding = false;
var activateRoutes = (rootContexts, routeReuseStrategy, forwardEvent, inputBindingEnabled) => (0, import_operators.map)((t) => {
  new ActivateRoutes(routeReuseStrategy, t.targetRouterState, t.currentRouterState, forwardEvent, inputBindingEnabled).activate(rootContexts);
  return t;
});
var ActivateRoutes = class {
  routeReuseStrategy;
  futureState;
  currState;
  forwardEvent;
  inputBindingEnabled;
  constructor(routeReuseStrategy, futureState, currState, forwardEvent, inputBindingEnabled) {
    this.routeReuseStrategy = routeReuseStrategy;
    this.futureState = futureState;
    this.currState = currState;
    this.forwardEvent = forwardEvent;
    this.inputBindingEnabled = inputBindingEnabled;
  }
  activate(parentContexts) {
    const futureRoot = this.futureState._root;
    const currRoot = this.currState ? this.currState._root : null;
    this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
    advanceActivatedRoute(this.futureState.root);
    this.activateChildRoutes(futureRoot, currRoot, parentContexts);
  }
  // De-activate the child route that are not re-used for the future state
  deactivateChildRoutes(futureNode, currNode, contexts) {
    const children = nodeChildrenAsMap(currNode);
    futureNode.children.forEach((futureChild) => {
      const childOutletName = futureChild.value.outlet;
      this.deactivateRoutes(futureChild, children[childOutletName], contexts);
      delete children[childOutletName];
    });
    Object.values(children).forEach((v) => {
      this.deactivateRouteAndItsChildren(v, contexts);
    });
  }
  deactivateRoutes(futureNode, currNode, parentContext) {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;
    if (future === curr) {
      if (future.component) {
        const context = parentContext.getContext(future.outlet);
        if (context) {
          this.deactivateChildRoutes(futureNode, currNode, context.children);
        }
      } else {
        this.deactivateChildRoutes(futureNode, currNode, parentContext);
      }
    } else {
      if (curr) {
        this.deactivateRouteAndItsChildren(currNode, parentContext);
      }
    }
  }
  deactivateRouteAndItsChildren(route, parentContexts) {
    if (route.value.component && this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
      this.detachAndStoreRouteSubtree(route, parentContexts);
    } else {
      this.deactivateRouteAndOutlet(route, parentContexts);
    }
  }
  detachAndStoreRouteSubtree(route, parentContexts) {
    const context = parentContexts.getContext(route.value.outlet);
    const contexts = context && route.value.component ? context.children : parentContexts;
    const children = nodeChildrenAsMap(route);
    for (const treeNode of Object.values(children)) {
      this.deactivateRouteAndItsChildren(treeNode, contexts);
    }
    if (context && context.outlet) {
      const componentRef = context.outlet.detach();
      const contexts2 = context.children.onOutletDeactivated();
      this.routeReuseStrategy.store(route.value.snapshot, {
        componentRef,
        route,
        contexts: contexts2
      });
    }
  }
  deactivateRouteAndOutlet(route, parentContexts) {
    const context = parentContexts.getContext(route.value.outlet);
    const contexts = context && route.value.component ? context.children : parentContexts;
    const children = nodeChildrenAsMap(route);
    for (const treeNode of Object.values(children)) {
      this.deactivateRouteAndItsChildren(treeNode, contexts);
    }
    if (context) {
      if (context.outlet) {
        context.outlet.deactivate();
        context.children.onOutletDeactivated();
      }
      context.attachRef = null;
      context.route = null;
    }
  }
  activateChildRoutes(futureNode, currNode, contexts) {
    const children = nodeChildrenAsMap(currNode);
    futureNode.children.forEach((c) => {
      this.activateRoutes(c, children[c.value.outlet], contexts);
      this.forwardEvent(new ActivationEnd(c.value.snapshot));
    });
    if (futureNode.children.length) {
      this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
    }
  }
  activateRoutes(futureNode, currNode, parentContexts) {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;
    advanceActivatedRoute(future);
    if (future === curr) {
      if (future.component) {
        const context = parentContexts.getOrCreateContext(future.outlet);
        this.activateChildRoutes(futureNode, currNode, context.children);
      } else {
        this.activateChildRoutes(futureNode, currNode, parentContexts);
      }
    } else {
      if (future.component) {
        const context = parentContexts.getOrCreateContext(future.outlet);
        if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
          const stored = this.routeReuseStrategy.retrieve(future.snapshot);
          this.routeReuseStrategy.store(future.snapshot, null);
          context.children.onOutletReAttached(stored.contexts);
          context.attachRef = stored.componentRef;
          context.route = stored.route.value;
          if (context.outlet) {
            context.outlet.attach(stored.componentRef, stored.route.value);
          }
          advanceActivatedRoute(stored.route.value);
          this.activateChildRoutes(futureNode, null, context.children);
        } else {
          context.attachRef = null;
          context.route = future;
          if (context.outlet) {
            context.outlet.activateWith(future, context.injector);
          }
          this.activateChildRoutes(futureNode, null, context.children);
        }
      } else {
        this.activateChildRoutes(futureNode, null, parentContexts);
      }
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const context = parentContexts.getOrCreateContext(future.outlet);
      const outlet = context.outlet;
      if (outlet && this.inputBindingEnabled && !outlet.supportsBindingToComponentInputs && !warnedAboutUnsupportedInputBinding) {
        console.warn(`'withComponentInputBinding' feature is enabled but this application is using an outlet that may not support binding to component inputs.`);
        warnedAboutUnsupportedInputBinding = true;
      }
    }
  }
};
var CanActivate = class {
  path;
  route;
  constructor(path2) {
    this.path = path2;
    this.route = this.path[this.path.length - 1];
  }
};
var CanDeactivate = class {
  component;
  route;
  constructor(component, route) {
    this.component = component;
    this.route = route;
  }
};
function getAllRouteGuards(future, curr, parentContexts) {
  const futureRoot = future._root;
  const currRoot = curr ? curr._root : null;
  return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
function getCanActivateChild(p) {
  const canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
  if (!canActivateChild || canActivateChild.length === 0) return null;
  return {
    node: p,
    guards: canActivateChild
  };
}
function getTokenOrFunctionIdentity(tokenOrFunction, injector) {
  const NOT_FOUND = Symbol();
  const result2 = injector.get(tokenOrFunction, NOT_FOUND);
  if (result2 === NOT_FOUND) {
    if (typeof tokenOrFunction === "function" && !isInjectable(tokenOrFunction)) {
      return tokenOrFunction;
    } else {
      return injector.get(tokenOrFunction);
    }
  }
  return result2;
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const prevChildren = nodeChildrenAsMap(currNode);
  futureNode.children.forEach((c) => {
    getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
    delete prevChildren[c.value.outlet];
  });
  Object.entries(prevChildren).forEach(([k, v]) => deactivateRouteAndItsChildren(v, contexts.getContext(k), checks));
  return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const future = futureNode.value;
  const curr = currNode ? currNode.value : null;
  const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
  if (curr && future.routeConfig === curr.routeConfig) {
    const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
    if (shouldRun) {
      checks.canActivateChecks.push(new CanActivate(futurePath));
    } else {
      future.data = curr.data;
      future._resolvedData = curr._resolvedData;
    }
    if (future.component) {
      getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
    }
    if (shouldRun && context && context.outlet && context.outlet.isActivated) {
      checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
    }
  } else {
    if (curr) {
      deactivateRouteAndItsChildren(currNode, context, checks);
    }
    checks.canActivateChecks.push(new CanActivate(futurePath));
    if (future.component) {
      getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
    }
  }
  return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
  if (typeof mode === "function") {
    return mode(curr, future);
  }
  switch (mode) {
    case "pathParamsChange":
      return !equalPath(curr.url, future.url);
    case "pathParamsOrQueryParamsChange":
      return !equalPath(curr.url, future.url) || !shallowEqual(curr.queryParams, future.queryParams);
    case "always":
      return true;
    case "paramsOrQueryParamsChange":
      return !equalParamsAndUrlSegments(curr, future) || !shallowEqual(curr.queryParams, future.queryParams);
    case "paramsChange":
    default:
      return !equalParamsAndUrlSegments(curr, future);
  }
}
function deactivateRouteAndItsChildren(route, context, checks) {
  const children = nodeChildrenAsMap(route);
  const r = route.value;
  Object.entries(children).forEach(([childName, node2]) => {
    if (!r.component) {
      deactivateRouteAndItsChildren(node2, context, checks);
    } else if (context) {
      deactivateRouteAndItsChildren(node2, context.children.getContext(childName), checks);
    } else {
      deactivateRouteAndItsChildren(node2, null, checks);
    }
  });
  if (!r.component) {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r));
  } else if (context && context.outlet && context.outlet.isActivated) {
    checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
  } else {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r));
  }
}
function isFunction(v) {
  return typeof v === "function";
}
function isBoolean(v) {
  return typeof v === "boolean";
}
function isCanLoad(guard) {
  return guard && isFunction(guard.canLoad);
}
function isCanActivate(guard) {
  return guard && isFunction(guard.canActivate);
}
function isCanActivateChild(guard) {
  return guard && isFunction(guard.canActivateChild);
}
function isCanDeactivate(guard) {
  return guard && isFunction(guard.canDeactivate);
}
function isCanMatch(guard) {
  return guard && isFunction(guard.canMatch);
}
function isEmptyError(e) {
  return e instanceof import_rxjs.EmptyError || e?.name === "EmptyError";
}
var INITIAL_VALUE = Symbol("INITIAL_VALUE");
function prioritizedGuardValue() {
  return (0, import_operators.switchMap)((obs) => {
    return (0, import_rxjs.combineLatest)(obs.map((o) => o.pipe((0, import_operators.take)(1), (0, import_operators.startWith)(INITIAL_VALUE)))).pipe((0, import_operators.map)((results) => {
      for (const result2 of results) {
        if (result2 === true) {
          continue;
        } else if (result2 === INITIAL_VALUE) {
          return INITIAL_VALUE;
        } else if (result2 === false || isRedirect(result2)) {
          return result2;
        }
      }
      return true;
    }), (0, import_operators.filter)((item) => item !== INITIAL_VALUE), (0, import_operators.take)(1));
  });
}
function isRedirect(val) {
  return isUrlTree(val) || val instanceof RedirectCommand;
}
function checkGuards(injector, forwardEvent) {
  return (0, import_operators.mergeMap)((t) => {
    const {
      targetSnapshot,
      currentSnapshot,
      guards: {
        canActivateChecks,
        canDeactivateChecks
      }
    } = t;
    if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
      return (0, import_rxjs.of)(__spreadProps(__spreadValues({}, t), {
        guardsResult: true
      }));
    }
    return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot, injector).pipe((0, import_operators.mergeMap)((canDeactivate) => {
      return canDeactivate && isBoolean(canDeactivate) ? runCanActivateChecks(targetSnapshot, canActivateChecks, injector, forwardEvent) : (0, import_rxjs.of)(canDeactivate);
    }), (0, import_operators.map)((guardsResult) => __spreadProps(__spreadValues({}, t), {
      guardsResult
    })));
  });
}
function runCanDeactivateChecks(checks, futureRSS, currRSS, injector) {
  return (0, import_rxjs.from)(checks).pipe((0, import_operators.mergeMap)((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS, injector)), (0, import_operators.first)((result2) => {
    return result2 !== true;
  }, true));
}
function runCanActivateChecks(futureSnapshot, checks, injector, forwardEvent) {
  return (0, import_rxjs.from)(checks).pipe((0, import_operators.concatMap)((check) => {
    return (0, import_rxjs.concat)(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path, injector), runCanActivate(futureSnapshot, check.route, injector));
  }), (0, import_operators.first)((result2) => {
    return result2 !== true;
  }, true));
}
function fireActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ActivationStart(snapshot));
  }
  return (0, import_rxjs.of)(true);
}
function fireChildActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ChildActivationStart(snapshot));
  }
  return (0, import_rxjs.of)(true);
}
function runCanActivate(futureRSS, futureARS, injector) {
  const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
  if (!canActivate || canActivate.length === 0) return (0, import_rxjs.of)(true);
  const canActivateObservables = canActivate.map((canActivate2) => {
    return (0, import_rxjs.defer)(() => {
      const closestInjector = getClosestRouteInjector(futureARS) ?? injector;
      const guard = getTokenOrFunctionIdentity(canActivate2, closestInjector);
      const guardVal = isCanActivate(guard) ? guard.canActivate(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS));
      return wrapIntoObservable(guardVal).pipe((0, import_operators.first)());
    });
  });
  return (0, import_rxjs.of)(canActivateObservables).pipe(prioritizedGuardValue());
}
function runCanActivateChild(futureRSS, path2, injector) {
  const futureARS = path2[path2.length - 1];
  const canActivateChildGuards = path2.slice(0, path2.length - 1).reverse().map((p) => getCanActivateChild(p)).filter((_) => _ !== null);
  const canActivateChildGuardsMapped = canActivateChildGuards.map((d) => {
    return (0, import_rxjs.defer)(() => {
      const guardsMapped = d.guards.map((canActivateChild) => {
        const closestInjector = getClosestRouteInjector(d.node) ?? injector;
        const guard = getTokenOrFunctionIdentity(canActivateChild, closestInjector);
        const guardVal = isCanActivateChild(guard) ? guard.canActivateChild(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS));
        return wrapIntoObservable(guardVal).pipe((0, import_operators.first)());
      });
      return (0, import_rxjs.of)(guardsMapped).pipe(prioritizedGuardValue());
    });
  });
  return (0, import_rxjs.of)(canActivateChildGuardsMapped).pipe(prioritizedGuardValue());
}
function runCanDeactivate(component, currARS, currRSS, futureRSS, injector) {
  const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
  if (!canDeactivate || canDeactivate.length === 0) return (0, import_rxjs.of)(true);
  const canDeactivateObservables = canDeactivate.map((c) => {
    const closestInjector = getClosestRouteInjector(currARS) ?? injector;
    const guard = getTokenOrFunctionIdentity(c, closestInjector);
    const guardVal = isCanDeactivate(guard) ? guard.canDeactivate(component, currARS, currRSS, futureRSS) : runInInjectionContext(closestInjector, () => guard(component, currARS, currRSS, futureRSS));
    return wrapIntoObservable(guardVal).pipe((0, import_operators.first)());
  });
  return (0, import_rxjs.of)(canDeactivateObservables).pipe(prioritizedGuardValue());
}
function runCanLoadGuards(injector, route, segments, urlSerializer) {
  const canLoad = route.canLoad;
  if (canLoad === void 0 || canLoad.length === 0) {
    return (0, import_rxjs.of)(true);
  }
  const canLoadObservables = canLoad.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanLoad(guard) ? guard.canLoad(route, segments) : runInInjectionContext(injector, () => guard(route, segments));
    return wrapIntoObservable(guardVal);
  });
  return (0, import_rxjs.of)(canLoadObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function redirectIfUrlTree(urlSerializer) {
  return (0, import_rxjs.pipe)((0, import_operators.tap)((result2) => {
    if (typeof result2 === "boolean") return;
    throw redirectingNavigationError(urlSerializer, result2);
  }), (0, import_operators.map)((result2) => result2 === true));
}
function runCanMatchGuards(injector, route, segments, urlSerializer) {
  const canMatch = route.canMatch;
  if (!canMatch || canMatch.length === 0) return (0, import_rxjs.of)(true);
  const canMatchObservables = canMatch.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanMatch(guard) ? guard.canMatch(route, segments) : runInInjectionContext(injector, () => guard(route, segments));
    return wrapIntoObservable(guardVal);
  });
  return (0, import_rxjs.of)(canMatchObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
var NoMatch = class {
  segmentGroup;
  constructor(segmentGroup) {
    this.segmentGroup = segmentGroup || null;
  }
};
var AbsoluteRedirect = class extends Error {
  urlTree;
  constructor(urlTree) {
    super();
    this.urlTree = urlTree;
  }
};
function noMatch$1(segmentGroup) {
  return (0, import_rxjs.throwError)(new NoMatch(segmentGroup));
}
function namedOutletsRedirect(redirectTo) {
  return (0, import_rxjs.throwError)(new RuntimeError(4e3, (typeof ngDevMode === "undefined" || ngDevMode) && `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`));
}
function canLoadFails(route) {
  return (0, import_rxjs.throwError)(navigationCancelingError((typeof ngDevMode === "undefined" || ngDevMode) && `Cannot load children because the guard of the route "path: '${route.path}'" returned false`, NavigationCancellationCode.GuardRejected));
}
var ApplyRedirects = class {
  urlSerializer;
  urlTree;
  constructor(urlSerializer, urlTree) {
    this.urlSerializer = urlSerializer;
    this.urlTree = urlTree;
  }
  lineralizeSegments(route, urlTree) {
    let res = [];
    let c = urlTree.root;
    while (true) {
      res = res.concat(c.segments);
      if (c.numberOfChildren === 0) {
        return (0, import_rxjs.of)(res);
      }
      if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
        return namedOutletsRedirect(`${route.redirectTo}`);
      }
      c = c.children[PRIMARY_OUTLET];
    }
  }
  applyRedirectCommands(segments, redirectTo, posParams, currentSnapshot, injector) {
    if (typeof redirectTo !== "string") {
      const redirectToFn = redirectTo;
      const {
        queryParams,
        fragment,
        routeConfig,
        url,
        outlet,
        params,
        data,
        title
      } = currentSnapshot;
      const newRedirect = runInInjectionContext(injector, () => redirectToFn({
        params,
        data,
        queryParams,
        fragment,
        routeConfig,
        url,
        outlet,
        title
      }));
      if (newRedirect instanceof UrlTree) {
        throw new AbsoluteRedirect(newRedirect);
      }
      redirectTo = newRedirect;
    }
    const newTree = this.applyRedirectCreateUrlTree(redirectTo, this.urlSerializer.parse(redirectTo), segments, posParams);
    if (redirectTo[0] === "/") {
      throw new AbsoluteRedirect(newTree);
    }
    return newTree;
  }
  applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
    const newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
    return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
  }
  createQueryParams(redirectToParams, actualParams) {
    const res = {};
    Object.entries(redirectToParams).forEach(([k, v]) => {
      const copySourceValue = typeof v === "string" && v[0] === ":";
      if (copySourceValue) {
        const sourceName = v.substring(1);
        res[k] = actualParams[sourceName];
      } else {
        res[k] = v;
      }
    });
    return res;
  }
  createSegmentGroup(redirectTo, group, segments, posParams) {
    const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
    let children = {};
    Object.entries(group.children).forEach(([name, child]) => {
      children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
    });
    return new UrlSegmentGroup(updatedSegments, children);
  }
  createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
    return redirectToSegments.map((s) => s.path[0] === ":" ? this.findPosParam(redirectTo, s, posParams) : this.findOrReturn(s, actualSegments));
  }
  findPosParam(redirectTo, redirectToUrlSegment, posParams) {
    const pos = posParams[redirectToUrlSegment.path.substring(1)];
    if (!pos) throw new RuntimeError(4001, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
    return pos;
  }
  findOrReturn(redirectToUrlSegment, actualSegments) {
    let idx = 0;
    for (const s of actualSegments) {
      if (s.path === redirectToUrlSegment.path) {
        actualSegments.splice(idx);
        return s;
      }
      idx++;
    }
    return redirectToUrlSegment;
  }
};
var noMatch = {
  matched: false,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {}
};
function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer) {
  const result2 = match(segmentGroup, route, segments);
  if (!result2.matched) {
    return (0, import_rxjs.of)(result2);
  }
  injector = getOrCreateRouteInjectorIfNeeded(route, injector);
  return runCanMatchGuards(injector, route, segments, urlSerializer).pipe((0, import_operators.map)((v) => v === true ? result2 : __spreadValues({}, noMatch)));
}
function match(segmentGroup, route, segments) {
  if (route.path === "**") {
    return createWildcardMatchResult(segments);
  }
  if (route.path === "") {
    if (route.pathMatch === "full" && (segmentGroup.hasChildren() || segments.length > 0)) {
      return __spreadValues({}, noMatch);
    }
    return {
      matched: true,
      consumedSegments: [],
      remainingSegments: segments,
      parameters: {},
      positionalParamSegments: {}
    };
  }
  const matcher = route.matcher || defaultUrlMatcher;
  const res = matcher(segments, segmentGroup, route);
  if (!res) return __spreadValues({}, noMatch);
  const posParams = {};
  Object.entries(res.posParams ?? {}).forEach(([k, v]) => {
    posParams[k] = v.path;
  });
  const parameters = res.consumed.length > 0 ? __spreadValues(__spreadValues({}, posParams), res.consumed[res.consumed.length - 1].parameters) : posParams;
  return {
    matched: true,
    consumedSegments: res.consumed,
    remainingSegments: segments.slice(res.consumed.length),
    // TODO(atscott): investigate combining parameters and positionalParamSegments
    parameters,
    positionalParamSegments: res.posParams ?? {}
  };
}
function createWildcardMatchResult(segments) {
  return {
    matched: true,
    parameters: segments.length > 0 ? last(segments).parameters : {},
    consumedSegments: segments,
    remainingSegments: [],
    positionalParamSegments: {}
  };
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
  if (slicedSegments.length > 0 && containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
    const s2 = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
    return {
      segmentGroup: s2,
      slicedSegments: []
    };
  }
  if (slicedSegments.length === 0 && containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
    const s2 = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
    return {
      segmentGroup: s2,
      slicedSegments
    };
  }
  const s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
  return {
    segmentGroup: s,
    slicedSegments
  };
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
  const res = {};
  for (const r of routes) {
    if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
      const s = new UrlSegmentGroup([], {});
      res[getOutlet(r)] = s;
    }
  }
  return __spreadValues(__spreadValues({}, children), res);
}
function createChildrenForEmptyPaths(routes, primarySegment) {
  const res = {};
  res[PRIMARY_OUTLET] = primarySegment;
  for (const r of routes) {
    if (r.path === "" && getOutlet(r) !== PRIMARY_OUTLET) {
      const s = new UrlSegmentGroup([], {});
      res[getOutlet(r)] = s;
    }
  }
  return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
  return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== PRIMARY_OUTLET);
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
  return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r));
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
  if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === "full") {
    return false;
  }
  return r.path === "";
}
function noLeftoversInUrl(segmentGroup, segments, outlet) {
  return segments.length === 0 && !segmentGroup.children[outlet];
}
var NoLeftoversInUrl = class {
};
function recognize$1(injector, configLoader, rootComponentType, config, urlTree, urlSerializer, paramsInheritanceStrategy = "emptyOnly") {
  return new Recognizer(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer).recognize();
}
var MAX_ALLOWED_REDIRECTS = 31;
var Recognizer = class {
  injector;
  configLoader;
  rootComponentType;
  config;
  urlTree;
  paramsInheritanceStrategy;
  urlSerializer;
  applyRedirects;
  absoluteRedirectCount = 0;
  allowRedirects = true;
  constructor(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer) {
    this.injector = injector;
    this.configLoader = configLoader;
    this.rootComponentType = rootComponentType;
    this.config = config;
    this.urlTree = urlTree;
    this.paramsInheritanceStrategy = paramsInheritanceStrategy;
    this.urlSerializer = urlSerializer;
    this.applyRedirects = new ApplyRedirects(this.urlSerializer, this.urlTree);
  }
  noMatchError(e) {
    return new RuntimeError(4002, typeof ngDevMode === "undefined" || ngDevMode ? `Cannot match any routes. URL Segment: '${e.segmentGroup}'` : `'${e.segmentGroup}'`);
  }
  recognize() {
    const rootSegmentGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
    return this.match(rootSegmentGroup).pipe((0, import_operators.map)(({
      children,
      rootSnapshot
    }) => {
      const rootNode = new TreeNode(rootSnapshot, children);
      const routeState = new RouterStateSnapshot("", rootNode);
      const tree2 = createUrlTreeFromSnapshot(rootSnapshot, [], this.urlTree.queryParams, this.urlTree.fragment);
      tree2.queryParams = this.urlTree.queryParams;
      routeState.url = this.urlSerializer.serialize(tree2);
      return {
        state: routeState,
        tree: tree2
      };
    }));
  }
  match(rootSegmentGroup) {
    const rootSnapshot = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(__spreadValues({}, this.urlTree.queryParams)), this.urlTree.fragment, Object.freeze({}), PRIMARY_OUTLET, this.rootComponentType, null, {});
    return this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET, rootSnapshot).pipe((0, import_operators.map)((children) => {
      return {
        children,
        rootSnapshot
      };
    }), (0, import_operators.catchError)((e) => {
      if (e instanceof AbsoluteRedirect) {
        this.urlTree = e.urlTree;
        return this.match(e.urlTree.root);
      }
      if (e instanceof NoMatch) {
        throw this.noMatchError(e);
      }
      throw e;
    }));
  }
  processSegmentGroup(injector, config, segmentGroup, outlet, parentRoute) {
    if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
      return this.processChildren(injector, config, segmentGroup, parentRoute);
    }
    return this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet, true, parentRoute).pipe((0, import_operators.map)((child) => child instanceof TreeNode ? [child] : []));
  }
  /**
   * Matches every child outlet in the `segmentGroup` to a `Route` in the config. Returns `null` if
   * we cannot find a match for _any_ of the children.
   *
   * @param config - The `Routes` to match against
   * @param segmentGroup - The `UrlSegmentGroup` whose children need to be matched against the
   *     config.
   */
  processChildren(injector, config, segmentGroup, parentRoute) {
    const childOutlets = [];
    for (const child of Object.keys(segmentGroup.children)) {
      if (child === "primary") {
        childOutlets.unshift(child);
      } else {
        childOutlets.push(child);
      }
    }
    return (0, import_rxjs.from)(childOutlets).pipe((0, import_operators.concatMap)((childOutlet) => {
      const child = segmentGroup.children[childOutlet];
      const sortedConfig = sortByMatchingOutlets(config, childOutlet);
      return this.processSegmentGroup(injector, sortedConfig, child, childOutlet, parentRoute);
    }), (0, import_operators.scan)((children, outletChildren) => {
      children.push(...outletChildren);
      return children;
    }), (0, import_operators.defaultIfEmpty)(null), (0, import_operators.last)(), (0, import_operators.mergeMap)((children) => {
      if (children === null) return noMatch$1(segmentGroup);
      const mergedChildren = mergeEmptyPathMatches(children);
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        checkOutletNameUniqueness(mergedChildren);
      }
      sortActivatedRouteSnapshots(mergedChildren);
      return (0, import_rxjs.of)(mergedChildren);
    }));
  }
  processSegment(injector, routes, segmentGroup, segments, outlet, allowRedirects, parentRoute) {
    return (0, import_rxjs.from)(routes).pipe((0, import_operators.concatMap)((r) => {
      return this.processSegmentAgainstRoute(r._injector ?? injector, routes, r, segmentGroup, segments, outlet, allowRedirects, parentRoute).pipe((0, import_operators.catchError)((e) => {
        if (e instanceof NoMatch) {
          return (0, import_rxjs.of)(null);
        }
        throw e;
      }));
    }), (0, import_operators.first)((x) => !!x), (0, import_operators.catchError)((e) => {
      if (isEmptyError(e)) {
        if (noLeftoversInUrl(segmentGroup, segments, outlet)) {
          return (0, import_rxjs.of)(new NoLeftoversInUrl());
        }
        return noMatch$1(segmentGroup);
      }
      throw e;
    }));
  }
  processSegmentAgainstRoute(injector, routes, route, rawSegment, segments, outlet, allowRedirects, parentRoute) {
    if (getOutlet(route) !== outlet && (outlet === PRIMARY_OUTLET || !emptyPathMatch(rawSegment, segments, route))) {
      return noMatch$1(rawSegment);
    }
    if (route.redirectTo === void 0) {
      return this.matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute);
    }
    if (this.allowRedirects && allowRedirects) {
      return this.expandSegmentAgainstRouteUsingRedirect(injector, rawSegment, routes, route, segments, outlet, parentRoute);
    }
    return noMatch$1(rawSegment);
  }
  expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet, parentRoute) {
    const {
      matched,
      parameters,
      consumedSegments,
      positionalParamSegments,
      remainingSegments
    } = match(segmentGroup, route, segments);
    if (!matched) return noMatch$1(segmentGroup);
    if (typeof route.redirectTo === "string" && route.redirectTo[0] === "/") {
      this.absoluteRedirectCount++;
      if (this.absoluteRedirectCount > MAX_ALLOWED_REDIRECTS) {
        if (ngDevMode) {
          throw new RuntimeError(4016, `Detected possible infinite redirect when redirecting from '${this.urlTree}' to '${route.redirectTo}'.
This is currently a dev mode only error but will become a call stack size exceeded error in production in a future major version.`);
        }
        this.allowRedirects = false;
      }
    }
    const currentSnapshot = new ActivatedRouteSnapshot(segments, parameters, Object.freeze(__spreadValues({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), route.component ?? route._loadedComponent ?? null, route, getResolve(route));
    const inherited = getInherited(currentSnapshot, parentRoute, this.paramsInheritanceStrategy);
    currentSnapshot.params = Object.freeze(inherited.params);
    currentSnapshot.data = Object.freeze(inherited.data);
    const newTree = this.applyRedirects.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments, currentSnapshot, injector);
    return this.applyRedirects.lineralizeSegments(route, newTree).pipe((0, import_operators.mergeMap)((newSegments) => {
      return this.processSegment(injector, routes, segmentGroup, newSegments.concat(remainingSegments), outlet, false, parentRoute);
    }));
  }
  matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute) {
    const matchResult = matchWithChecks(rawSegment, route, segments, injector, this.urlSerializer);
    if (route.path === "**") {
      rawSegment.children = {};
    }
    return matchResult.pipe((0, import_operators.switchMap)((result2) => {
      if (!result2.matched) {
        return noMatch$1(rawSegment);
      }
      injector = route._injector ?? injector;
      return this.getChildConfig(injector, route, segments).pipe((0, import_operators.switchMap)(({
        routes: childConfig
      }) => {
        const childInjector = route._loadedInjector ?? injector;
        const {
          parameters,
          consumedSegments,
          remainingSegments
        } = result2;
        const snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(__spreadValues({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), route.component ?? route._loadedComponent ?? null, route, getResolve(route));
        const inherited = getInherited(snapshot, parentRoute, this.paramsInheritanceStrategy);
        snapshot.params = Object.freeze(inherited.params);
        snapshot.data = Object.freeze(inherited.data);
        const {
          segmentGroup,
          slicedSegments
        } = split(rawSegment, consumedSegments, remainingSegments, childConfig);
        if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
          return this.processChildren(childInjector, childConfig, segmentGroup, snapshot).pipe((0, import_operators.map)((children) => {
            return new TreeNode(snapshot, children);
          }));
        }
        if (childConfig.length === 0 && slicedSegments.length === 0) {
          return (0, import_rxjs.of)(new TreeNode(snapshot, []));
        }
        const matchedOnOutlet = getOutlet(route) === outlet;
        return this.processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet, true, snapshot).pipe((0, import_operators.map)((child) => {
          return new TreeNode(snapshot, child instanceof TreeNode ? [child] : []);
        }));
      }));
    }));
  }
  getChildConfig(injector, route, segments) {
    if (route.children) {
      return (0, import_rxjs.of)({
        routes: route.children,
        injector
      });
    }
    if (route.loadChildren) {
      if (route._loadedRoutes !== void 0) {
        return (0, import_rxjs.of)({
          routes: route._loadedRoutes,
          injector: route._loadedInjector
        });
      }
      return runCanLoadGuards(injector, route, segments, this.urlSerializer).pipe((0, import_operators.mergeMap)((shouldLoadResult) => {
        if (shouldLoadResult) {
          return this.configLoader.loadChildren(injector, route).pipe((0, import_operators.tap)((cfg) => {
            route._loadedRoutes = cfg.routes;
            route._loadedInjector = cfg.injector;
          }));
        }
        return canLoadFails(route);
      }));
    }
    return (0, import_rxjs.of)({
      routes: [],
      injector
    });
  }
};
function sortActivatedRouteSnapshots(nodes) {
  nodes.sort((a, b) => {
    if (a.value.outlet === PRIMARY_OUTLET) return -1;
    if (b.value.outlet === PRIMARY_OUTLET) return 1;
    return a.value.outlet.localeCompare(b.value.outlet);
  });
}
function hasEmptyPathConfig(node2) {
  const config = node2.value.routeConfig;
  return config && config.path === "";
}
function mergeEmptyPathMatches(nodes) {
  const result2 = [];
  const mergedNodes = /* @__PURE__ */ new Set();
  for (const node2 of nodes) {
    if (!hasEmptyPathConfig(node2)) {
      result2.push(node2);
      continue;
    }
    const duplicateEmptyPathNode = result2.find((resultNode) => node2.value.routeConfig === resultNode.value.routeConfig);
    if (duplicateEmptyPathNode !== void 0) {
      duplicateEmptyPathNode.children.push(...node2.children);
      mergedNodes.add(duplicateEmptyPathNode);
    } else {
      result2.push(node2);
    }
  }
  for (const mergedNode of mergedNodes) {
    const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
    result2.push(new TreeNode(mergedNode.value, mergedChildren));
  }
  return result2.filter((n) => !mergedNodes.has(n));
}
function checkOutletNameUniqueness(nodes) {
  const names = {};
  nodes.forEach((n) => {
    const routeWithSameOutletName = names[n.value.outlet];
    if (routeWithSameOutletName) {
      const p = routeWithSameOutletName.url.map((s) => s.toString()).join("/");
      const c = n.value.url.map((s) => s.toString()).join("/");
      throw new RuntimeError(4006, (typeof ngDevMode === "undefined" || ngDevMode) && `Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
    }
    names[n.value.outlet] = n.value;
  });
}
function getData(route) {
  return route.data || {};
}
function getResolve(route) {
  return route.resolve || {};
}
function recognize(injector, configLoader, rootComponentType, config, serializer, paramsInheritanceStrategy) {
  return (0, import_operators.mergeMap)((t) => recognize$1(injector, configLoader, rootComponentType, config, t.extractedUrl, serializer, paramsInheritanceStrategy).pipe((0, import_operators.map)(({
    state: targetSnapshot,
    tree: urlAfterRedirects
  }) => {
    return __spreadProps(__spreadValues({}, t), {
      targetSnapshot,
      urlAfterRedirects
    });
  })));
}
function resolveData(paramsInheritanceStrategy, injector) {
  return (0, import_operators.mergeMap)((t) => {
    const {
      targetSnapshot,
      guards: {
        canActivateChecks
      }
    } = t;
    if (!canActivateChecks.length) {
      return (0, import_rxjs.of)(t);
    }
    const routesWithResolversToRun = new Set(canActivateChecks.map((check) => check.route));
    const routesNeedingDataUpdates = /* @__PURE__ */ new Set();
    for (const route of routesWithResolversToRun) {
      if (routesNeedingDataUpdates.has(route)) {
        continue;
      }
      for (const newRoute of flattenRouteTree(route)) {
        routesNeedingDataUpdates.add(newRoute);
      }
    }
    let routesProcessed = 0;
    return (0, import_rxjs.from)(routesNeedingDataUpdates).pipe((0, import_operators.concatMap)((route) => {
      if (routesWithResolversToRun.has(route)) {
        return runResolve(route, targetSnapshot, paramsInheritanceStrategy, injector);
      } else {
        route.data = getInherited(route, route.parent, paramsInheritanceStrategy).resolve;
        return (0, import_rxjs.of)(void 0);
      }
    }), (0, import_operators.tap)(() => routesProcessed++), (0, import_operators.takeLast)(1), (0, import_operators.mergeMap)((_) => routesProcessed === routesNeedingDataUpdates.size ? (0, import_rxjs.of)(t) : import_rxjs.EMPTY));
  });
}
function flattenRouteTree(route) {
  const descendants = route.children.map((child) => flattenRouteTree(child)).flat();
  return [route, ...descendants];
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, injector) {
  const config = futureARS.routeConfig;
  const resolve2 = futureARS._resolve;
  if (config?.title !== void 0 && !hasStaticTitle(config)) {
    resolve2[RouteTitleKey] = config.title;
  }
  return resolveNode(resolve2, futureARS, futureRSS, injector).pipe((0, import_operators.map)((resolvedData) => {
    futureARS._resolvedData = resolvedData;
    futureARS.data = getInherited(futureARS, futureARS.parent, paramsInheritanceStrategy).resolve;
    return null;
  }));
}
function resolveNode(resolve2, futureARS, futureRSS, injector) {
  const keys = getDataKeys(resolve2);
  if (keys.length === 0) {
    return (0, import_rxjs.of)({});
  }
  const data = {};
  return (0, import_rxjs.from)(keys).pipe((0, import_operators.mergeMap)((key) => getResolver(resolve2[key], futureARS, futureRSS, injector).pipe((0, import_operators.first)(), (0, import_operators.tap)((value) => {
    if (value instanceof RedirectCommand) {
      throw redirectingNavigationError(new DefaultUrlSerializer(), value);
    }
    data[key] = value;
  }))), (0, import_operators.takeLast)(1), (0, import_operators.map)(() => data), (0, import_operators.catchError)((e) => isEmptyError(e) ? import_rxjs.EMPTY : (0, import_rxjs.throwError)(e)));
}
function getResolver(injectionToken, futureARS, futureRSS, injector) {
  const closestInjector = getClosestRouteInjector(futureARS) ?? injector;
  const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
  const resolverValue = resolver.resolve ? resolver.resolve(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => resolver(futureARS, futureRSS));
  return wrapIntoObservable(resolverValue);
}
function switchTap(next) {
  return (0, import_operators.switchMap)((v) => {
    const nextResult = next(v);
    if (nextResult) {
      return (0, import_rxjs.from)(nextResult).pipe((0, import_operators.map)(() => v));
    }
    return (0, import_rxjs.of)(v);
  });
}
var TitleStrategy = class _TitleStrategy {
  /**
   * @returns The `title` of the deepest primary route.
   */
  buildTitle(snapshot) {
    let pageTitle;
    let route = snapshot.root;
    while (route !== void 0) {
      pageTitle = this.getResolvedTitleForRoute(route) ?? pageTitle;
      route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
    }
    return pageTitle;
  }
  /**
   * Given an `ActivatedRouteSnapshot`, returns the final value of the
   * `Route.title` property, which can either be a static string or a resolved value.
   */
  getResolvedTitleForRoute(snapshot) {
    return snapshot.data[RouteTitleKey];
  }
  static ɵfac = function TitleStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TitleStrategy)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _TitleStrategy,
    factory: () => (() => inject(DefaultTitleStrategy))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TitleStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(DefaultTitleStrategy)
    }]
  }], null, null);
})();
var DefaultTitleStrategy = class _DefaultTitleStrategy extends TitleStrategy {
  title;
  constructor(title) {
    super();
    this.title = title;
  }
  /**
   * Sets the title of the browser to the given value.
   *
   * @param title The `pageTitle` from the deepest primary route.
   */
  updateTitle(snapshot) {
    const title = this.buildTitle(snapshot);
    if (title !== void 0) {
      this.title.setTitle(title);
    }
  }
  static ɵfac = function DefaultTitleStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefaultTitleStrategy)(ɵɵinject(Title));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _DefaultTitleStrategy,
    factory: _DefaultTitleStrategy.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultTitleStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Title
  }], null);
})();
var ROUTER_CONFIGURATION = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router config" : "", {
  providedIn: "root",
  factory: () => ({})
});
var ɵEmptyOutletComponent = class _ɵEmptyOutletComponent {
  static ɵfac = function ɵEmptyOutletComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ɵEmptyOutletComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ɵEmptyOutletComponent,
    selectors: [["ng-component"]],
    exportAs: ["emptyRouterOutlet"],
    decls: 1,
    vars: 0,
    template: function _EmptyOutletComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelement(0, "router-outlet");
      }
    },
    dependencies: [RouterOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵEmptyOutletComponent, [{
    type: Component,
    args: [{
      template: `<router-outlet/>`,
      imports: [RouterOutlet],
      // Used to avoid component ID collisions with user code.
      exportAs: "emptyRouterOutlet"
    }]
  }], null, null);
})();
function standardizeConfig(r) {
  const children = r.children && r.children.map(standardizeConfig);
  const c = children ? __spreadProps(__spreadValues({}, r), {
    children
  }) : __spreadValues({}, r);
  if (!c.component && !c.loadComponent && (children || c.loadChildren) && c.outlet && c.outlet !== PRIMARY_OUTLET) {
    c.component = ɵEmptyOutletComponent;
  }
  return c;
}
var ROUTES = new InjectionToken(ngDevMode ? "ROUTES" : "");
var RouterConfigLoader = class _RouterConfigLoader {
  componentLoaders = /* @__PURE__ */ new WeakMap();
  childrenLoaders = /* @__PURE__ */ new WeakMap();
  onLoadStartListener;
  onLoadEndListener;
  compiler = inject(Compiler);
  loadComponent(route) {
    if (this.componentLoaders.get(route)) {
      return this.componentLoaders.get(route);
    } else if (route._loadedComponent) {
      return (0, import_rxjs.of)(route._loadedComponent);
    }
    if (this.onLoadStartListener) {
      this.onLoadStartListener(route);
    }
    const loadRunner = wrapIntoObservable(route.loadComponent()).pipe((0, import_operators.map)(maybeUnwrapDefaultExport), (0, import_operators.tap)((component) => {
      if (this.onLoadEndListener) {
        this.onLoadEndListener(route);
      }
      (typeof ngDevMode === "undefined" || ngDevMode) && assertStandalone(route.path ?? "", component);
      route._loadedComponent = component;
    }), (0, import_operators.finalize)(() => {
      this.componentLoaders.delete(route);
    }));
    const loader = new import_rxjs.ConnectableObservable(loadRunner, () => new import_rxjs.Subject()).pipe((0, import_operators.refCount)());
    this.componentLoaders.set(route, loader);
    return loader;
  }
  loadChildren(parentInjector, route) {
    if (this.childrenLoaders.get(route)) {
      return this.childrenLoaders.get(route);
    } else if (route._loadedRoutes) {
      return (0, import_rxjs.of)({
        routes: route._loadedRoutes,
        injector: route._loadedInjector
      });
    }
    if (this.onLoadStartListener) {
      this.onLoadStartListener(route);
    }
    const moduleFactoryOrRoutes$ = loadChildren(route, this.compiler, parentInjector, this.onLoadEndListener);
    const loadRunner = moduleFactoryOrRoutes$.pipe((0, import_operators.finalize)(() => {
      this.childrenLoaders.delete(route);
    }));
    const loader = new import_rxjs.ConnectableObservable(loadRunner, () => new import_rxjs.Subject()).pipe((0, import_operators.refCount)());
    this.childrenLoaders.set(route, loader);
    return loader;
  }
  static ɵfac = function RouterConfigLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouterConfigLoader)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RouterConfigLoader,
    factory: _RouterConfigLoader.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterConfigLoader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function loadChildren(route, compiler, parentInjector, onLoadEndListener) {
  return wrapIntoObservable(route.loadChildren()).pipe((0, import_operators.map)(maybeUnwrapDefaultExport), (0, import_operators.mergeMap)((t) => {
    if (t instanceof NgModuleFactory$1 || Array.isArray(t)) {
      return (0, import_rxjs.of)(t);
    } else {
      return (0, import_rxjs.from)(compiler.compileModuleAsync(t));
    }
  }), (0, import_operators.map)((factoryOrRoutes) => {
    if (onLoadEndListener) {
      onLoadEndListener(route);
    }
    let injector;
    let rawRoutes;
    let requireStandaloneComponents = false;
    if (Array.isArray(factoryOrRoutes)) {
      rawRoutes = factoryOrRoutes;
      requireStandaloneComponents = true;
    } else {
      injector = factoryOrRoutes.create(parentInjector).injector;
      rawRoutes = injector.get(ROUTES, [], {
        optional: true,
        self: true
      }).flat();
    }
    const routes = rawRoutes.map(standardizeConfig);
    (typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(routes, route.path, requireStandaloneComponents);
    return {
      routes,
      injector
    };
  }));
}
function isWrappedDefaultExport(value) {
  return value && typeof value === "object" && "default" in value;
}
function maybeUnwrapDefaultExport(input3) {
  return isWrappedDefaultExport(input3) ? input3["default"] : input3;
}
var UrlHandlingStrategy = class _UrlHandlingStrategy {
  static ɵfac = function UrlHandlingStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UrlHandlingStrategy)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UrlHandlingStrategy,
    factory: () => (() => inject(DefaultUrlHandlingStrategy))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlHandlingStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(DefaultUrlHandlingStrategy)
    }]
  }], null, null);
})();
var DefaultUrlHandlingStrategy = class _DefaultUrlHandlingStrategy {
  shouldProcessUrl(url) {
    return true;
  }
  extract(url) {
    return url;
  }
  merge(newUrlPart, wholeUrl) {
    return newUrlPart;
  }
  static ɵfac = function DefaultUrlHandlingStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefaultUrlHandlingStrategy)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _DefaultUrlHandlingStrategy,
    factory: _DefaultUrlHandlingStrategy.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultUrlHandlingStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CREATE_VIEW_TRANSITION = new InjectionToken(ngDevMode ? "view transition helper" : "");
var VIEW_TRANSITION_OPTIONS = new InjectionToken(ngDevMode ? "view transition options" : "");
function createViewTransition(injector, from3, to) {
  const transitionOptions = injector.get(VIEW_TRANSITION_OPTIONS);
  const document2 = injector.get(DOCUMENT);
  return injector.get(NgZone).runOutsideAngular(() => {
    if (!document2.startViewTransition || transitionOptions.skipNextTransition) {
      transitionOptions.skipNextTransition = false;
      return new Promise((resolve2) => setTimeout(resolve2));
    }
    let resolveViewTransitionStarted;
    const viewTransitionStarted = new Promise((resolve2) => {
      resolveViewTransitionStarted = resolve2;
    });
    const transition = document2.startViewTransition(() => {
      resolveViewTransitionStarted();
      return createRenderPromise(injector);
    });
    const {
      onViewTransitionCreated
    } = transitionOptions;
    if (onViewTransitionCreated) {
      runInInjectionContext(injector, () => onViewTransitionCreated({
        transition,
        from: from3,
        to
      }));
    }
    return viewTransitionStarted;
  });
}
function createRenderPromise(injector) {
  return new Promise((resolve2) => {
    afterNextRender({
      read: () => setTimeout(resolve2)
    }, {
      injector
    });
  });
}
var NAVIGATION_ERROR_HANDLER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "navigation error handler" : "");
var NavigationTransitions = class _NavigationTransitions {
  currentNavigation = null;
  currentTransition = null;
  lastSuccessfulNavigation = null;
  /**
   * These events are used to communicate back to the Router about the state of the transition. The
   * Router wants to respond to these events in various ways. Because the `NavigationTransition`
   * class is not public, this event subject is not publicly exposed.
   */
  events = new import_rxjs.Subject();
  /**
   * Used to abort the current transition with an error.
   */
  transitionAbortSubject = new import_rxjs.Subject();
  configLoader = inject(RouterConfigLoader);
  environmentInjector = inject(EnvironmentInjector);
  destroyRef = inject(DestroyRef);
  urlSerializer = inject(UrlSerializer);
  rootContexts = inject(ChildrenOutletContexts);
  location = inject(Location);
  inputBindingEnabled = inject(INPUT_BINDER, {
    optional: true
  }) !== null;
  titleStrategy = inject(TitleStrategy);
  options = inject(ROUTER_CONFIGURATION, {
    optional: true
  }) || {};
  paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly";
  urlHandlingStrategy = inject(UrlHandlingStrategy);
  createViewTransition = inject(CREATE_VIEW_TRANSITION, {
    optional: true
  });
  navigationErrorHandler = inject(NAVIGATION_ERROR_HANDLER, {
    optional: true
  });
  navigationId = 0;
  get hasRequestedNavigation() {
    return this.navigationId !== 0;
  }
  transitions;
  /**
   * Hook that enables you to pause navigation after the preactivation phase.
   * Used by `RouterModule`.
   *
   * @internal
   */
  afterPreactivation = () => (0, import_rxjs.of)(void 0);
  /** @internal */
  rootComponentType = null;
  destroyed = false;
  constructor() {
    const onLoadStart = (r) => this.events.next(new RouteConfigLoadStart(r));
    const onLoadEnd = (r) => this.events.next(new RouteConfigLoadEnd(r));
    this.configLoader.onLoadEndListener = onLoadEnd;
    this.configLoader.onLoadStartListener = onLoadStart;
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }
  complete() {
    this.transitions?.complete();
  }
  handleNavigationRequest(request) {
    const id = ++this.navigationId;
    this.transitions?.next(__spreadProps(__spreadValues({}, request), {
      extractedUrl: this.urlHandlingStrategy.extract(request.rawUrl),
      targetSnapshot: null,
      targetRouterState: null,
      guards: {
        canActivateChecks: [],
        canDeactivateChecks: []
      },
      guardsResult: null,
      id
    }));
  }
  setupNavigations(router) {
    this.transitions = new import_rxjs.BehaviorSubject(null);
    return this.transitions.pipe(
      (0, import_operators.filter)((t) => t !== null),
      // Using switchMap so we cancel executing navigations when a new one comes in
      (0, import_operators.switchMap)((overallTransitionState) => {
        let completed = false;
        let errored = false;
        return (0, import_rxjs.of)(overallTransitionState).pipe(
          (0, import_operators.switchMap)((t) => {
            if (this.navigationId > overallTransitionState.id) {
              const cancellationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
              this.cancelNavigationTransition(overallTransitionState, cancellationReason, NavigationCancellationCode.SupersededByNewNavigation);
              return import_rxjs.EMPTY;
            }
            this.currentTransition = overallTransitionState;
            this.currentNavigation = {
              id: t.id,
              initialUrl: t.rawUrl,
              extractedUrl: t.extractedUrl,
              targetBrowserUrl: typeof t.extras.browserUrl === "string" ? this.urlSerializer.parse(t.extras.browserUrl) : t.extras.browserUrl,
              trigger: t.source,
              extras: t.extras,
              previousNavigation: !this.lastSuccessfulNavigation ? null : __spreadProps(__spreadValues({}, this.lastSuccessfulNavigation), {
                previousNavigation: null
              })
            };
            const urlTransition = !router.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl();
            const onSameUrlNavigation = t.extras.onSameUrlNavigation ?? router.onSameUrlNavigation;
            if (!urlTransition && onSameUrlNavigation !== "reload") {
              const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation to ${t.rawUrl} was ignored because it is the same as the current Router URL.` : "";
              this.events.next(new NavigationSkipped(t.id, this.urlSerializer.serialize(t.rawUrl), reason, NavigationSkippedCode.IgnoredSameUrlNavigation));
              t.resolve(false);
              return import_rxjs.EMPTY;
            }
            if (this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) {
              return (0, import_rxjs.of)(t).pipe(
                // Fire NavigationStart event
                (0, import_operators.switchMap)((t2) => {
                  this.events.next(new NavigationStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), t2.source, t2.restoredState));
                  if (t2.id !== this.navigationId) {
                    return import_rxjs.EMPTY;
                  }
                  return Promise.resolve(t2);
                }),
                // Recognize
                recognize(this.environmentInjector, this.configLoader, this.rootComponentType, router.config, this.urlSerializer, this.paramsInheritanceStrategy),
                // Update URL if in `eager` update mode
                (0, import_operators.tap)((t2) => {
                  overallTransitionState.targetSnapshot = t2.targetSnapshot;
                  overallTransitionState.urlAfterRedirects = t2.urlAfterRedirects;
                  this.currentNavigation = __spreadProps(__spreadValues({}, this.currentNavigation), {
                    finalUrl: t2.urlAfterRedirects
                  });
                  const routesRecognized = new RoutesRecognized(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                  this.events.next(routesRecognized);
                })
              );
            } else if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(t.currentRawUrl)) {
              const {
                id,
                extractedUrl,
                source,
                restoredState,
                extras
              } = t;
              const navStart = new NavigationStart(id, this.urlSerializer.serialize(extractedUrl), source, restoredState);
              this.events.next(navStart);
              const targetSnapshot = createEmptyState(this.rootComponentType).snapshot;
              this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t), {
                targetSnapshot,
                urlAfterRedirects: extractedUrl,
                extras: __spreadProps(__spreadValues({}, extras), {
                  skipLocationChange: false,
                  replaceUrl: false
                })
              });
              this.currentNavigation.finalUrl = extractedUrl;
              return (0, import_rxjs.of)(overallTransitionState);
            } else {
              const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation was ignored because the UrlHandlingStrategy indicated neither the current URL ${t.currentRawUrl} nor target URL ${t.rawUrl} should be processed.` : "";
              this.events.next(new NavigationSkipped(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, NavigationSkippedCode.IgnoredByUrlHandlingStrategy));
              t.resolve(false);
              return import_rxjs.EMPTY;
            }
          }),
          // --- GUARDS ---
          (0, import_operators.tap)((t) => {
            const guardsStart = new GuardsCheckStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
            this.events.next(guardsStart);
          }),
          (0, import_operators.map)((t) => {
            this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t), {
              guards: getAllRouteGuards(t.targetSnapshot, t.currentSnapshot, this.rootContexts)
            });
            return overallTransitionState;
          }),
          checkGuards(this.environmentInjector, (evt) => this.events.next(evt)),
          (0, import_operators.tap)((t) => {
            overallTransitionState.guardsResult = t.guardsResult;
            if (t.guardsResult && typeof t.guardsResult !== "boolean") {
              throw redirectingNavigationError(this.urlSerializer, t.guardsResult);
            }
            const guardsEnd = new GuardsCheckEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
            this.events.next(guardsEnd);
          }),
          (0, import_operators.filter)((t) => {
            if (!t.guardsResult) {
              this.cancelNavigationTransition(t, "", NavigationCancellationCode.GuardRejected);
              return false;
            }
            return true;
          }),
          // --- RESOLVE ---
          switchTap((t) => {
            if (t.guards.canActivateChecks.length === 0) {
              return void 0;
            }
            return (0, import_rxjs.of)(t).pipe((0, import_operators.tap)((t2) => {
              const resolveStart = new ResolveStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
              this.events.next(resolveStart);
            }), (0, import_operators.switchMap)((t2) => {
              let dataResolved = false;
              return (0, import_rxjs.of)(t2).pipe(resolveData(this.paramsInheritanceStrategy, this.environmentInjector), (0, import_operators.tap)({
                next: () => dataResolved = true,
                complete: () => {
                  if (!dataResolved) {
                    this.cancelNavigationTransition(t2, typeof ngDevMode === "undefined" || ngDevMode ? `At least one route resolver didn't emit any value.` : "", NavigationCancellationCode.NoDataFromResolver);
                  }
                }
              }));
            }), (0, import_operators.tap)((t2) => {
              const resolveEnd = new ResolveEnd(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
              this.events.next(resolveEnd);
            }));
          }),
          // --- LOAD COMPONENTS ---
          switchTap((t) => {
            const loadComponents = (route) => {
              const loaders = [];
              if (route.routeConfig?.loadComponent && !route.routeConfig._loadedComponent) {
                loaders.push(this.configLoader.loadComponent(route.routeConfig).pipe((0, import_operators.tap)((loadedComponent) => {
                  route.component = loadedComponent;
                }), (0, import_operators.map)(() => void 0)));
              }
              for (const child of route.children) {
                loaders.push(...loadComponents(child));
              }
              return loaders;
            };
            return (0, import_rxjs.combineLatest)(loadComponents(t.targetSnapshot.root)).pipe((0, import_operators.defaultIfEmpty)(null), (0, import_operators.take)(1));
          }),
          switchTap(() => this.afterPreactivation()),
          (0, import_operators.switchMap)(() => {
            const {
              currentSnapshot,
              targetSnapshot
            } = overallTransitionState;
            const viewTransitionStarted = this.createViewTransition?.(this.environmentInjector, currentSnapshot.root, targetSnapshot.root);
            return viewTransitionStarted ? (0, import_rxjs.from)(viewTransitionStarted).pipe((0, import_operators.map)(() => overallTransitionState)) : (0, import_rxjs.of)(overallTransitionState);
          }),
          (0, import_operators.map)((t) => {
            const targetRouterState = createRouterState(router.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
            this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t), {
              targetRouterState
            });
            this.currentNavigation.targetRouterState = targetRouterState;
            return overallTransitionState;
          }),
          (0, import_operators.tap)(() => {
            this.events.next(new BeforeActivateRoutes());
          }),
          activateRoutes(this.rootContexts, router.routeReuseStrategy, (evt) => this.events.next(evt), this.inputBindingEnabled),
          // Ensure that if some observable used to drive the transition doesn't
          // complete, the navigation still finalizes This should never happen, but
          // this is done as a safety measure to avoid surfacing this error (#49567).
          (0, import_operators.take)(1),
          (0, import_operators.tap)({
            next: (t) => {
              completed = true;
              this.lastSuccessfulNavigation = this.currentNavigation;
              this.events.next(new NavigationEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects)));
              this.titleStrategy?.updateTitle(t.targetRouterState.snapshot);
              t.resolve(true);
            },
            complete: () => {
              completed = true;
            }
          }),
          // There used to be a lot more logic happening directly within the
          // transition Observable. Some of this logic has been refactored out to
          // other places but there may still be errors that happen there. This gives
          // us a way to cancel the transition from the outside. This may also be
          // required in the future to support something like the abort signal of the
          // Navigation API where the navigation gets aborted from outside the
          // transition.
          (0, import_operators.takeUntil)(this.transitionAbortSubject.pipe((0, import_operators.tap)((err) => {
            throw err;
          }))),
          (0, import_operators.finalize)(() => {
            if (!completed && !errored) {
              const cancelationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
              this.cancelNavigationTransition(overallTransitionState, cancelationReason, NavigationCancellationCode.SupersededByNewNavigation);
            }
            if (this.currentTransition?.id === overallTransitionState.id) {
              this.currentNavigation = null;
              this.currentTransition = null;
            }
          }),
          (0, import_operators.catchError)((e) => {
            if (this.destroyed) {
              overallTransitionState.resolve(false);
              return import_rxjs.EMPTY;
            }
            errored = true;
            if (isNavigationCancelingError(e)) {
              this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e.message, e.cancellationCode));
              if (!isRedirectingNavigationCancelingError(e)) {
                overallTransitionState.resolve(false);
              } else {
                this.events.next(new RedirectRequest(e.url, e.navigationBehaviorOptions));
              }
            } else {
              const navigationError = new NavigationError(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e, overallTransitionState.targetSnapshot ?? void 0);
              try {
                const navigationErrorHandlerResult = runInInjectionContext(this.environmentInjector, () => this.navigationErrorHandler?.(navigationError));
                if (navigationErrorHandlerResult instanceof RedirectCommand) {
                  const {
                    message,
                    cancellationCode
                  } = redirectingNavigationError(this.urlSerializer, navigationErrorHandlerResult);
                  this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), message, cancellationCode));
                  this.events.next(new RedirectRequest(navigationErrorHandlerResult.redirectTo, navigationErrorHandlerResult.navigationBehaviorOptions));
                } else {
                  this.events.next(navigationError);
                  throw e;
                }
              } catch (ee) {
                if (this.options.resolveNavigationPromiseOnError) {
                  overallTransitionState.resolve(false);
                } else {
                  overallTransitionState.reject(ee);
                }
              }
            }
            return import_rxjs.EMPTY;
          })
        );
      })
    );
  }
  cancelNavigationTransition(t, reason, code) {
    const navCancel = new NavigationCancel(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, code);
    this.events.next(navCancel);
    t.resolve(false);
  }
  /**
   * @returns Whether we're navigating to somewhere that is not what the Router is
   * currently set to.
   */
  isUpdatingInternalState() {
    return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString();
  }
  /**
   * @returns Whether we're updating the browser URL to something new (navigation is going
   * to somewhere not displayed in the URL bar and we will update the URL
   * bar if navigation succeeds).
   */
  isUpdatedBrowserUrl() {
    const currentBrowserUrl = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true)));
    const targetBrowserUrl = this.currentNavigation?.targetBrowserUrl ?? this.currentNavigation?.extractedUrl;
    return currentBrowserUrl.toString() !== targetBrowserUrl?.toString() && !this.currentNavigation?.extras.skipLocationChange;
  }
  static ɵfac = function NavigationTransitions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavigationTransitions)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NavigationTransitions,
    factory: _NavigationTransitions.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavigationTransitions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function isBrowserTriggeredNavigation(source) {
  return source !== IMPERATIVE_NAVIGATION;
}
var RouteReuseStrategy = class _RouteReuseStrategy {
  static ɵfac = function RouteReuseStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouteReuseStrategy)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RouteReuseStrategy,
    factory: () => (() => inject(DefaultRouteReuseStrategy))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouteReuseStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(DefaultRouteReuseStrategy)
    }]
  }], null, null);
})();
var BaseRouteReuseStrategy = class {
  /**
   * Whether the given route should detach for later reuse.
   * Always returns false for `BaseRouteReuseStrategy`.
   * */
  shouldDetach(route) {
    return false;
  }
  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(route, detachedTree) {
  }
  /** Returns `false`, meaning the route (and its subtree) is never reattached */
  shouldAttach(route) {
    return false;
  }
  /** Returns `null` because this strategy does not store routes for later re-use. */
  retrieve(route) {
    return null;
  }
  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are
   * identical.
   */
  shouldReuseRoute(future, curr) {
    return future.routeConfig === curr.routeConfig;
  }
};
var DefaultRouteReuseStrategy = class _DefaultRouteReuseStrategy extends BaseRouteReuseStrategy {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultRouteReuseStrategy_BaseFactory;
    return function DefaultRouteReuseStrategy_Factory(__ngFactoryType__) {
      return (ɵDefaultRouteReuseStrategy_BaseFactory || (ɵDefaultRouteReuseStrategy_BaseFactory = ɵɵgetInheritedFactory(_DefaultRouteReuseStrategy)))(__ngFactoryType__ || _DefaultRouteReuseStrategy);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DefaultRouteReuseStrategy,
    factory: _DefaultRouteReuseStrategy.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultRouteReuseStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var StateManager = class _StateManager {
  urlSerializer = inject(UrlSerializer);
  options = inject(ROUTER_CONFIGURATION, {
    optional: true
  }) || {};
  canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
  location = inject(Location);
  urlHandlingStrategy = inject(UrlHandlingStrategy);
  urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
  currentUrlTree = new UrlTree();
  /**
   * Returns the currently activated `UrlTree`.
   *
   * This `UrlTree` shows only URLs that the `Router` is configured to handle (through
   * `UrlHandlingStrategy`).
   *
   * The value is set after finding the route config tree to activate but before activating the
   * route.
   */
  getCurrentUrlTree() {
    return this.currentUrlTree;
  }
  rawUrlTree = this.currentUrlTree;
  /**
   * Returns a `UrlTree` that is represents what the browser is actually showing.
   *
   * In the life of a navigation transition:
   * 1. When a navigation begins, the raw `UrlTree` is updated to the full URL that's being
   * navigated to.
   * 2. During a navigation, redirects are applied, which might only apply to _part_ of the URL (due
   * to `UrlHandlingStrategy`).
   * 3. Just before activation, the raw `UrlTree` is updated to include the redirects on top of the
   * original raw URL.
   *
   * Note that this is _only_ here to support `UrlHandlingStrategy.extract` and
   * `UrlHandlingStrategy.shouldProcessUrl`. Without those APIs, the current `UrlTree` would not
   * deviated from the raw `UrlTree`.
   *
   * For `extract`, a raw `UrlTree` is needed because `extract` may only return part
   * of the navigation URL. Thus, the current `UrlTree` may only represent _part_ of the browser
   * URL. When a navigation gets cancelled and the router needs to reset the URL or a new navigation
   * occurs, it needs to know the _whole_ browser URL, not just the part handled by
   * `UrlHandlingStrategy`.
   * For `shouldProcessUrl`, when the return is `false`, the router ignores the navigation but
   * still updates the raw `UrlTree` with the assumption that the navigation was caused by the
   * location change listener due to a URL update by the AngularJS router. In this case, the router
   * still need to know what the browser's URL is for future navigations.
   */
  getRawUrlTree() {
    return this.rawUrlTree;
  }
  createBrowserPath({
    finalUrl,
    initialUrl,
    targetBrowserUrl
  }) {
    const rawUrl = finalUrl !== void 0 ? this.urlHandlingStrategy.merge(finalUrl, initialUrl) : initialUrl;
    const url = targetBrowserUrl ?? rawUrl;
    const path2 = url instanceof UrlTree ? this.urlSerializer.serialize(url) : url;
    return path2;
  }
  commitTransition({
    targetRouterState,
    finalUrl,
    initialUrl
  }) {
    if (finalUrl && targetRouterState) {
      this.currentUrlTree = finalUrl;
      this.rawUrlTree = this.urlHandlingStrategy.merge(finalUrl, initialUrl);
      this.routerState = targetRouterState;
    } else {
      this.rawUrlTree = initialUrl;
    }
  }
  routerState = createEmptyState(null);
  /** Returns the current RouterState. */
  getRouterState() {
    return this.routerState;
  }
  stateMemento = this.createStateMemento();
  updateStateMemento() {
    this.stateMemento = this.createStateMemento();
  }
  createStateMemento() {
    return {
      rawUrlTree: this.rawUrlTree,
      currentUrlTree: this.currentUrlTree,
      routerState: this.routerState
    };
  }
  resetInternalState({
    finalUrl
  }) {
    this.routerState = this.stateMemento.routerState;
    this.currentUrlTree = this.stateMemento.currentUrlTree;
    this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, finalUrl ?? this.rawUrlTree);
  }
  static ɵfac = function StateManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StateManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _StateManager,
    factory: () => (() => inject(HistoryStateManager))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateManager, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(HistoryStateManager)
    }]
  }], null, null);
})();
var HistoryStateManager = class _HistoryStateManager extends StateManager {
  /**
   * The id of the currently active page in the router.
   * Updated to the transition's target id on a successful navigation.
   *
   * This is used to track what page the router last activated. When an attempted navigation fails,
   * the router can then use this to compute how to restore the state back to the previously active
   * page.
   */
  currentPageId = 0;
  lastSuccessfulId = -1;
  restoredState() {
    return this.location.getState();
  }
  /**
   * The ɵrouterPageId of whatever page is currently active in the browser history. This is
   * important for computing the target page id for new navigations because we need to ensure each
   * page id in the browser history is 1 more than the previous entry.
   */
  get browserPageId() {
    if (this.canceledNavigationResolution !== "computed") {
      return this.currentPageId;
    }
    return this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
  }
  registerNonRouterCurrentEntryChangeListener(listener) {
    return this.location.subscribe((event) => {
      if (event["type"] === "popstate") {
        setTimeout(() => {
          listener(event["url"], event.state, "popstate");
        });
      }
    });
  }
  handleRouterEvent(e, currentTransition) {
    if (e instanceof NavigationStart) {
      this.updateStateMemento();
    } else if (e instanceof NavigationSkipped) {
      this.commitTransition(currentTransition);
    } else if (e instanceof RoutesRecognized) {
      if (this.urlUpdateStrategy === "eager") {
        if (!currentTransition.extras.skipLocationChange) {
          this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
        }
      }
    } else if (e instanceof BeforeActivateRoutes) {
      this.commitTransition(currentTransition);
      if (this.urlUpdateStrategy === "deferred" && !currentTransition.extras.skipLocationChange) {
        this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
      }
    } else if (e instanceof NavigationCancel && (e.code === NavigationCancellationCode.GuardRejected || e.code === NavigationCancellationCode.NoDataFromResolver)) {
      this.restoreHistory(currentTransition);
    } else if (e instanceof NavigationError) {
      this.restoreHistory(currentTransition, true);
    } else if (e instanceof NavigationEnd) {
      this.lastSuccessfulId = e.id;
      this.currentPageId = this.browserPageId;
    }
  }
  setBrowserUrl(path2, {
    extras,
    id
  }) {
    const {
      replaceUrl,
      state
    } = extras;
    if (this.location.isCurrentPathEqualTo(path2) || !!replaceUrl) {
      const currentBrowserPageId = this.browserPageId;
      const newState = __spreadValues(__spreadValues({}, state), this.generateNgRouterState(id, currentBrowserPageId));
      this.location.replaceState(path2, "", newState);
    } else {
      const newState = __spreadValues(__spreadValues({}, state), this.generateNgRouterState(id, this.browserPageId + 1));
      this.location.go(path2, "", newState);
    }
  }
  /**
   * Performs the necessary rollback action to restore the browser URL to the
   * state before the transition.
   */
  restoreHistory(navigation, restoringFromCaughtError = false) {
    if (this.canceledNavigationResolution === "computed") {
      const currentBrowserPageId = this.browserPageId;
      const targetPagePosition = this.currentPageId - currentBrowserPageId;
      if (targetPagePosition !== 0) {
        this.location.historyGo(targetPagePosition);
      } else if (this.getCurrentUrlTree() === navigation.finalUrl && targetPagePosition === 0) {
        this.resetInternalState(navigation);
        this.resetUrlToCurrentUrlTree();
      } else ;
    } else if (this.canceledNavigationResolution === "replace") {
      if (restoringFromCaughtError) {
        this.resetInternalState(navigation);
      }
      this.resetUrlToCurrentUrlTree();
    }
  }
  resetUrlToCurrentUrlTree() {
    this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
  }
  generateNgRouterState(navigationId, routerPageId) {
    if (this.canceledNavigationResolution === "computed") {
      return {
        navigationId,
        ɵrouterPageId: routerPageId
      };
    }
    return {
      navigationId
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵHistoryStateManager_BaseFactory;
    return function HistoryStateManager_Factory(__ngFactoryType__) {
      return (ɵHistoryStateManager_BaseFactory || (ɵHistoryStateManager_BaseFactory = ɵɵgetInheritedFactory(_HistoryStateManager)))(__ngFactoryType__ || _HistoryStateManager);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _HistoryStateManager,
    factory: _HistoryStateManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryStateManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function afterNextNavigation(router, action) {
  router.events.pipe((0, import_operators.filter)((e) => e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError || e instanceof NavigationSkipped), (0, import_operators.map)((e) => {
    if (e instanceof NavigationEnd || e instanceof NavigationSkipped) {
      return 0;
    }
    const redirecting = e instanceof NavigationCancel ? e.code === NavigationCancellationCode.Redirect || e.code === NavigationCancellationCode.SupersededByNewNavigation : false;
    return redirecting ? 2 : 1;
  }), (0, import_operators.filter)(
    (result2) => result2 !== 2
    /* NavigationResult.REDIRECTING */
  ), (0, import_operators.take)(1)).subscribe(() => {
    action();
  });
}
var exactMatchOptions = {
  paths: "exact",
  fragment: "ignored",
  matrixParams: "ignored",
  queryParams: "exact"
};
var subsetMatchOptions = {
  paths: "subset",
  fragment: "ignored",
  matrixParams: "ignored",
  queryParams: "subset"
};
var Router = class _Router {
  get currentUrlTree() {
    return this.stateManager.getCurrentUrlTree();
  }
  get rawUrlTree() {
    return this.stateManager.getRawUrlTree();
  }
  disposed = false;
  nonRouterCurrentEntryChangeSubscription;
  console = inject(Console);
  stateManager = inject(StateManager);
  options = inject(ROUTER_CONFIGURATION, {
    optional: true
  }) || {};
  pendingTasks = inject(PendingTasksInternal);
  urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
  navigationTransitions = inject(NavigationTransitions);
  urlSerializer = inject(UrlSerializer);
  location = inject(Location);
  urlHandlingStrategy = inject(UrlHandlingStrategy);
  /**
   * The private `Subject` type for the public events exposed in the getter. This is used internally
   * to push events to. The separate field allows us to expose separate types in the public API
   * (i.e., an Observable rather than the Subject).
   */
  _events = new import_rxjs.Subject();
  /**
   * An event stream for routing events.
   */
  get events() {
    return this._events;
  }
  /**
   * The current state of routing in this NgModule.
   */
  get routerState() {
    return this.stateManager.getRouterState();
  }
  /**
   * True if at least one navigation event has occurred,
   * false otherwise.
   */
  navigated = false;
  /**
   * A strategy for re-using routes.
   *
   * @deprecated Configure using `providers` instead:
   *   `{provide: RouteReuseStrategy, useClass: MyStrategy}`.
   */
  routeReuseStrategy = inject(RouteReuseStrategy);
  /**
   * How to handle a navigation request to the current URL.
   *
   *
   * @deprecated Configure this through `provideRouter` or `RouterModule.forRoot` instead.
   * @see {@link withRouterConfig}
   * @see {@link provideRouter}
   * @see {@link RouterModule}
   */
  onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
  config = inject(ROUTES, {
    optional: true
  })?.flat() ?? [];
  /**
   * Indicates whether the application has opted in to binding Router data to component inputs.
   *
   * This option is enabled by the `withComponentInputBinding` feature of `provideRouter` or
   * `bindToComponentInputs` in the `ExtraOptions` of `RouterModule.forRoot`.
   */
  componentInputBindingEnabled = !!inject(INPUT_BINDER, {
    optional: true
  });
  constructor() {
    this.resetConfig(this.config);
    this.navigationTransitions.setupNavigations(this).subscribe({
      error: (e) => {
        this.console.warn(ngDevMode ? `Unhandled Navigation Error: ${e}` : e);
      }
    });
    this.subscribeToNavigationEvents();
  }
  eventsSubscription = new import_rxjs.Subscription();
  subscribeToNavigationEvents() {
    const subscription = this.navigationTransitions.events.subscribe((e) => {
      try {
        const currentTransition = this.navigationTransitions.currentTransition;
        const currentNavigation = this.navigationTransitions.currentNavigation;
        if (currentTransition !== null && currentNavigation !== null) {
          this.stateManager.handleRouterEvent(e, currentNavigation);
          if (e instanceof NavigationCancel && e.code !== NavigationCancellationCode.Redirect && e.code !== NavigationCancellationCode.SupersededByNewNavigation) {
            this.navigated = true;
          } else if (e instanceof NavigationEnd) {
            this.navigated = true;
          } else if (e instanceof RedirectRequest) {
            const opts = e.navigationBehaviorOptions;
            const mergedTree = this.urlHandlingStrategy.merge(e.url, currentTransition.currentRawUrl);
            const extras = __spreadValues({
              browserUrl: currentTransition.extras.browserUrl,
              info: currentTransition.extras.info,
              skipLocationChange: currentTransition.extras.skipLocationChange,
              // The URL is already updated at this point if we have 'eager' URL
              // updates or if the navigation was triggered by the browser (back
              // button, URL bar, etc). We want to replace that item in history
              // if the navigation is rejected.
              replaceUrl: currentTransition.extras.replaceUrl || this.urlUpdateStrategy === "eager" || isBrowserTriggeredNavigation(currentTransition.source)
            }, opts);
            this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras, {
              resolve: currentTransition.resolve,
              reject: currentTransition.reject,
              promise: currentTransition.promise
            });
          }
        }
        if (isPublicRouterEvent(e)) {
          this._events.next(e);
        }
      } catch (e2) {
        this.navigationTransitions.transitionAbortSubject.next(e2);
      }
    });
    this.eventsSubscription.add(subscription);
  }
  /** @internal */
  resetRootComponentType(rootComponentType) {
    this.routerState.root.component = rootComponentType;
    this.navigationTransitions.rootComponentType = rootComponentType;
  }
  /**
   * Sets up the location change listener and performs the initial navigation.
   */
  initialNavigation() {
    this.setUpLocationChangeListener();
    if (!this.navigationTransitions.hasRequestedNavigation) {
      this.navigateToSyncWithBrowser(this.location.path(true), IMPERATIVE_NAVIGATION, this.stateManager.restoredState());
    }
  }
  /**
   * Sets up the location change listener. This listener detects navigations triggered from outside
   * the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
   * navigation so that the correct events, guards, etc. are triggered.
   */
  setUpLocationChangeListener() {
    this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((url, state, source) => {
      this.navigateToSyncWithBrowser(url, source, state);
    });
  }
  /**
   * Schedules a router navigation to synchronize Router state with the browser state.
   *
   * This is done as a response to a popstate event and the initial navigation. These
   * two scenarios represent times when the browser URL/state has been updated and
   * the Router needs to respond to ensure its internal state matches.
   */
  navigateToSyncWithBrowser(url, source, state) {
    const extras = {
      replaceUrl: true
    };
    const restoredState = state?.navigationId ? state : null;
    if (state) {
      const stateCopy = __spreadValues({}, state);
      delete stateCopy.navigationId;
      delete stateCopy.ɵrouterPageId;
      if (Object.keys(stateCopy).length !== 0) {
        extras.state = stateCopy;
      }
    }
    const urlTree = this.parseUrl(url);
    this.scheduleNavigation(urlTree, source, restoredState, extras);
  }
  /** The current URL. */
  get url() {
    return this.serializeUrl(this.currentUrlTree);
  }
  /**
   * Returns the current `Navigation` object when the router is navigating,
   * and `null` when idle.
   */
  getCurrentNavigation() {
    return this.navigationTransitions.currentNavigation;
  }
  /**
   * The `Navigation` object of the most recent navigation to succeed and `null` if there
   *     has not been a successful navigation yet.
   */
  get lastSuccessfulNavigation() {
    return this.navigationTransitions.lastSuccessfulNavigation;
  }
  /**
   * Resets the route configuration used for navigation and generating links.
   *
   * @param config The route array for the new configuration.
   *
   * @usageNotes
   *
   * ```ts
   * router.resetConfig([
   *  { path: 'team/:id', component: TeamCmp, children: [
   *    { path: 'simple', component: SimpleCmp },
   *    { path: 'user/:name', component: UserCmp }
   *  ]}
   * ]);
   * ```
   */
  resetConfig(config) {
    (typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(config);
    this.config = config.map(standardizeConfig);
    this.navigated = false;
  }
  /** @nodoc */
  ngOnDestroy() {
    this.dispose();
  }
  /** Disposes of the router. */
  dispose() {
    this._events.unsubscribe();
    this.navigationTransitions.complete();
    if (this.nonRouterCurrentEntryChangeSubscription) {
      this.nonRouterCurrentEntryChangeSubscription.unsubscribe();
      this.nonRouterCurrentEntryChangeSubscription = void 0;
    }
    this.disposed = true;
    this.eventsSubscription.unsubscribe();
  }
  /**
   * Appends URL segments to the current URL tree to create a new URL tree.
   *
   * @param commands An array of URL fragments with which to construct the new URL tree.
   * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
   * segments, followed by the parameters for each segment.
   * The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
   * property of the options object, if supplied.
   * @param navigationExtras Options that control the navigation strategy.
   * @returns The new URL tree.
   *
   * @usageNotes
   *
   * ```
   * // create /team/33/user/11
   * router.createUrlTree(['/team', 33, 'user', 11]);
   *
   * // create /team/33;expand=true/user/11
   * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
   *
   * // you can collapse static segments like this (this works only with the first passed-in value):
   * router.createUrlTree(['/team/33/user', userId]);
   *
   * // If the first segment can contain slashes, and you do not want the router to split it,
   * // you can do the following:
   * router.createUrlTree([{segmentPath: '/one/two'}]);
   *
   * // create /team/33/(user/11//right:chat)
   * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
   *
   * // remove the right secondary node
   * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
   *
   * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
   *
   * // navigate to /team/33/user/11/details
   * router.createUrlTree(['details'], {relativeTo: route});
   *
   * // navigate to /team/33/user/22
   * router.createUrlTree(['../22'], {relativeTo: route});
   *
   * // navigate to /team/44/user/22
   * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
   *
   * Note that a value of `null` or `undefined` for `relativeTo` indicates that the
   * tree should be created relative to the root.
   * ```
   */
  createUrlTree(commands, navigationExtras = {}) {
    const {
      relativeTo,
      queryParams,
      fragment,
      queryParamsHandling,
      preserveFragment
    } = navigationExtras;
    const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
    let q = null;
    switch (queryParamsHandling ?? this.options.defaultQueryParamsHandling) {
      case "merge":
        q = __spreadValues(__spreadValues({}, this.currentUrlTree.queryParams), queryParams);
        break;
      case "preserve":
        q = this.currentUrlTree.queryParams;
        break;
      default:
        q = queryParams || null;
    }
    if (q !== null) {
      q = this.removeEmptyProps(q);
    }
    let relativeToUrlSegmentGroup;
    try {
      const relativeToSnapshot = relativeTo ? relativeTo.snapshot : this.routerState.snapshot.root;
      relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeToSnapshot);
    } catch (e) {
      if (typeof commands[0] !== "string" || commands[0][0] !== "/") {
        commands = [];
      }
      relativeToUrlSegmentGroup = this.currentUrlTree.root;
    }
    return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, q, f ?? null);
  }
  /**
   * Navigates to a view using an absolute route path.
   *
   * @param url An absolute path for a defined route. The function does not apply any delta to the
   *     current URL.
   * @param extras An object containing properties that modify the navigation strategy.
   *
   * @returns A Promise that resolves to 'true' when navigation succeeds,
   * to 'false' when navigation fails, or is rejected on error.
   *
   * @usageNotes
   *
   * The following calls request navigation to an absolute path.
   *
   * ```ts
   * router.navigateByUrl("/team/33/user/11");
   *
   * // Navigate without updating the URL
   * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
   * ```
   *
   * @see [Routing and Navigation guide](guide/routing/common-router-tasks)
   *
   */
  navigateByUrl(url, extras = {
    skipLocationChange: false
  }) {
    const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
    const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
    return this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras);
  }
  /**
   * Navigate based on the provided array of commands and a starting point.
   * If no starting route is provided, the navigation is absolute.
   *
   * @param commands An array of URL fragments with which to construct the target URL.
   * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
   * segments, followed by the parameters for each segment.
   * The fragments are applied to the current URL or the one provided  in the `relativeTo` property
   * of the options object, if supplied.
   * @param extras An options object that determines how the URL should be constructed or
   *     interpreted.
   *
   * @returns A Promise that resolves to `true` when navigation succeeds, or `false` when navigation
   *     fails. The Promise is rejected when an error occurs if `resolveNavigationPromiseOnError` is
   * not `true`.
   *
   * @usageNotes
   *
   * The following calls request navigation to a dynamic route path relative to the current URL.
   *
   * ```ts
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
   *
   * // Navigate without updating the URL, overriding the default behavior
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
   * ```
   *
   * @see [Routing and Navigation guide](guide/routing/common-router-tasks)
   *
   */
  navigate(commands, extras = {
    skipLocationChange: false
  }) {
    validateCommands(commands);
    return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
  }
  /** Serializes a `UrlTree` into a string */
  serializeUrl(url) {
    return this.urlSerializer.serialize(url);
  }
  /** Parses a string into a `UrlTree` */
  parseUrl(url) {
    try {
      return this.urlSerializer.parse(url);
    } catch {
      return this.urlSerializer.parse("/");
    }
  }
  isActive(url, matchOptions) {
    let options;
    if (matchOptions === true) {
      options = __spreadValues({}, exactMatchOptions);
    } else if (matchOptions === false) {
      options = __spreadValues({}, subsetMatchOptions);
    } else {
      options = matchOptions;
    }
    if (isUrlTree(url)) {
      return containsTree(this.currentUrlTree, url, options);
    }
    const urlTree = this.parseUrl(url);
    return containsTree(this.currentUrlTree, urlTree, options);
  }
  removeEmptyProps(params) {
    return Object.entries(params).reduce((result2, [key, value]) => {
      if (value !== null && value !== void 0) {
        result2[key] = value;
      }
      return result2;
    }, {});
  }
  scheduleNavigation(rawUrl, source, restoredState, extras, priorPromise) {
    if (this.disposed) {
      return Promise.resolve(false);
    }
    let resolve2;
    let reject;
    let promise;
    if (priorPromise) {
      resolve2 = priorPromise.resolve;
      reject = priorPromise.reject;
      promise = priorPromise.promise;
    } else {
      promise = new Promise((res, rej) => {
        resolve2 = res;
        reject = rej;
      });
    }
    const taskId = this.pendingTasks.add();
    afterNextNavigation(this, () => {
      queueMicrotask(() => this.pendingTasks.remove(taskId));
    });
    this.navigationTransitions.handleNavigationRequest({
      source,
      restoredState,
      currentUrlTree: this.currentUrlTree,
      currentRawUrl: this.currentUrlTree,
      rawUrl,
      extras,
      resolve: resolve2,
      reject,
      promise,
      currentSnapshot: this.routerState.snapshot,
      currentRouterState: this.routerState
    });
    return promise.catch((e) => {
      return Promise.reject(e);
    });
  }
  static ɵfac = function Router_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Router)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _Router,
    factory: _Router.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Router, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function validateCommands(commands) {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new RuntimeError(4008, (typeof ngDevMode === "undefined" || ngDevMode) && `The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
function isPublicRouterEvent(e) {
  return !(e instanceof BeforeActivateRoutes) && !(e instanceof RedirectRequest);
}

// node_modules/@angular/router/fesm2022/router_module-CbmfhtZA.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
var import_operators2 = __toESM(require_operators(), 1);
var RouterLink = class _RouterLink {
  router;
  route;
  tabIndexAttribute;
  renderer;
  el;
  locationStrategy;
  /**
   * Represents an `href` attribute value applied to a host element,
   * when a host element is `<a>`. For other tags, the value is `null`.
   */
  href = null;
  /**
   * Represents the `target` attribute on a host element.
   * This is only used when the host element is an `<a>` tag.
   */
  target;
  /**
   * Passed to {@link Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#queryParams}
   * @see {@link Router#createUrlTree}
   */
  queryParams;
  /**
   * Passed to {@link Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#fragment}
   * @see {@link Router#createUrlTree}
   */
  fragment;
  /**
   * Passed to {@link Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#queryParamsHandling}
   * @see {@link Router#createUrlTree}
   */
  queryParamsHandling;
  /**
   * Passed to {@link Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#state}
   * @see {@link Router#navigateByUrl}
   */
  state;
  /**
   * Passed to {@link Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#info}
   * @see {@link Router#navigateByUrl}
   */
  info;
  /**
   * Passed to {@link Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * Specify a value here when you do not want to use the default value
   * for `routerLink`, which is the current activated route.
   * Note that a value of `undefined` here will use the `routerLink` default.
   * @see {@link UrlCreationOptions#relativeTo}
   * @see {@link Router#createUrlTree}
   */
  relativeTo;
  /** Whether a host element is an `<a>` tag. */
  isAnchorElement;
  subscription;
  /** @internal */
  onChanges = new import_rxjs2.Subject();
  constructor(router, route, tabIndexAttribute, renderer, el, locationStrategy) {
    this.router = router;
    this.route = route;
    this.tabIndexAttribute = tabIndexAttribute;
    this.renderer = renderer;
    this.el = el;
    this.locationStrategy = locationStrategy;
    const tagName = el.nativeElement.tagName?.toLowerCase();
    this.isAnchorElement = tagName === "a" || tagName === "area";
    if (this.isAnchorElement) {
      this.subscription = router.events.subscribe((s) => {
        if (s instanceof NavigationEnd) {
          this.updateHref();
        }
      });
    } else {
      this.setTabIndexIfNotOnNativeEl("0");
    }
  }
  /**
   * Passed to {@link Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#preserveFragment}
   * @see {@link Router#createUrlTree}
   */
  preserveFragment = false;
  /**
   * Passed to {@link Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#skipLocationChange}
   * @see {@link Router#navigateByUrl}
   */
  skipLocationChange = false;
  /**
   * Passed to {@link Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#replaceUrl}
   * @see {@link Router#navigateByUrl}
   */
  replaceUrl = false;
  /**
   * Modifies the tab index if there was not a tabindex attribute on the element during
   * instantiation.
   */
  setTabIndexIfNotOnNativeEl(newTabIndex) {
    if (this.tabIndexAttribute != null || this.isAnchorElement) {
      return;
    }
    this.applyAttributeValue("tabindex", newTabIndex);
  }
  /** @nodoc */
  // TODO(atscott): Remove changes parameter in major version as a breaking change.
  ngOnChanges(changes) {
    if (ngDevMode && isUrlTree(this.routerLinkInput) && (this.fragment !== void 0 || this.queryParams || this.queryParamsHandling || this.preserveFragment || this.relativeTo)) {
      throw new RuntimeError(4016, "Cannot configure queryParams or fragment when using a UrlTree as the routerLink input value.");
    }
    if (this.isAnchorElement) {
      this.updateHref();
    }
    this.onChanges.next(this);
  }
  routerLinkInput = null;
  /**
   * Commands to pass to {@link Router#createUrlTree} or a `UrlTree`.
   *   - **array**: commands to pass to {@link Router#createUrlTree}.
   *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
   *   - **UrlTree**: a `UrlTree` for this link rather than creating one from the commands
   *     and other inputs that correspond to properties of `UrlCreationOptions`.
   *   - **null|undefined**: effectively disables the `routerLink`
   * @see {@link Router#createUrlTree}
   */
  set routerLink(commandsOrUrlTree) {
    if (commandsOrUrlTree == null) {
      this.routerLinkInput = null;
      this.setTabIndexIfNotOnNativeEl(null);
    } else {
      if (isUrlTree(commandsOrUrlTree)) {
        this.routerLinkInput = commandsOrUrlTree;
      } else {
        this.routerLinkInput = Array.isArray(commandsOrUrlTree) ? commandsOrUrlTree : [commandsOrUrlTree];
      }
      this.setTabIndexIfNotOnNativeEl("0");
    }
  }
  /** @nodoc */
  onClick(button, ctrlKey, shiftKey, altKey, metaKey) {
    const urlTree = this.urlTree;
    if (urlTree === null) {
      return true;
    }
    if (this.isAnchorElement) {
      if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
        return true;
      }
      if (typeof this.target === "string" && this.target != "_self") {
        return true;
      }
    }
    const extras = {
      skipLocationChange: this.skipLocationChange,
      replaceUrl: this.replaceUrl,
      state: this.state,
      info: this.info
    };
    this.router.navigateByUrl(urlTree, extras);
    return !this.isAnchorElement;
  }
  /** @nodoc */
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  updateHref() {
    const urlTree = this.urlTree;
    this.href = urlTree !== null && this.locationStrategy ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(urlTree)) : null;
    const sanitizedValue = this.href === null ? null : (
      // This class represents a directive that can be added to both `<a>` elements,
      // as well as other elements. As a result, we can't define security context at
      // compile time. So the security context is deferred to runtime.
      // The `ɵɵsanitizeUrlOrResourceUrl` selects the necessary sanitizer function
      // based on the tag and property names. The logic mimics the one from
      // `packages/compiler/src/schema/dom_security_schema.ts`, which is used at compile time.
      //
      // Note: we should investigate whether we can switch to using `@HostBinding('attr.href')`
      // instead of applying a value via a renderer, after a final merge of the
      // `RouterLinkWithHref` directive.
      ɵɵsanitizeUrlOrResourceUrl(this.href, this.el.nativeElement.tagName.toLowerCase(), "href")
    );
    this.applyAttributeValue("href", sanitizedValue);
  }
  applyAttributeValue(attrName, attrValue) {
    const renderer = this.renderer;
    const nativeElement = this.el.nativeElement;
    if (attrValue !== null) {
      renderer.setAttribute(nativeElement, attrName, attrValue);
    } else {
      renderer.removeAttribute(nativeElement, attrName);
    }
  }
  get urlTree() {
    if (this.routerLinkInput === null) {
      return null;
    } else if (isUrlTree(this.routerLinkInput)) {
      return this.routerLinkInput;
    }
    return this.router.createUrlTree(this.routerLinkInput, {
      // If the `relativeTo` input is not defined, we want to use `this.route` by default.
      // Otherwise, we should use the value provided by the user in the input.
      relativeTo: this.relativeTo !== void 0 ? this.relativeTo : this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: this.preserveFragment
    });
  }
  static ɵfac = function RouterLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouterLink)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ActivatedRoute), ɵɵinjectAttribute("tabindex"), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(LocationStrategy));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _RouterLink,
    selectors: [["", "routerLink", ""]],
    hostVars: 1,
    hostBindings: function RouterLink_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function RouterLink_click_HostBindingHandler($event) {
          return ctx.onClick($event.button, $event.ctrlKey, $event.shiftKey, $event.altKey, $event.metaKey);
        });
      }
      if (rf & 2) {
        ɵɵattribute("target", ctx.target);
      }
    },
    inputs: {
      target: "target",
      queryParams: "queryParams",
      fragment: "fragment",
      queryParamsHandling: "queryParamsHandling",
      state: "state",
      info: "info",
      relativeTo: "relativeTo",
      preserveFragment: [2, "preserveFragment", "preserveFragment", booleanAttribute],
      skipLocationChange: [2, "skipLocationChange", "skipLocationChange", booleanAttribute],
      replaceUrl: [2, "replaceUrl", "replaceUrl", booleanAttribute],
      routerLink: "routerLink"
    },
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLink, [{
    type: Directive,
    args: [{
      selector: "[routerLink]"
    }]
  }], () => [{
    type: Router
  }, {
    type: ActivatedRoute
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: LocationStrategy
  }], {
    target: [{
      type: HostBinding,
      args: ["attr.target"]
    }, {
      type: Input
    }],
    queryParams: [{
      type: Input
    }],
    fragment: [{
      type: Input
    }],
    queryParamsHandling: [{
      type: Input
    }],
    state: [{
      type: Input
    }],
    info: [{
      type: Input
    }],
    relativeTo: [{
      type: Input
    }],
    preserveFragment: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    skipLocationChange: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    replaceUrl: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    routerLink: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event.button", "$event.ctrlKey", "$event.shiftKey", "$event.altKey", "$event.metaKey"]]
    }]
  });
})();
var RouterLinkActive = class _RouterLinkActive {
  router;
  element;
  renderer;
  cdr;
  link;
  links;
  classes = [];
  routerEventsSubscription;
  linkInputChangesSubscription;
  _isActive = false;
  get isActive() {
    return this._isActive;
  }
  /**
   * Options to configure how to determine if the router link is active.
   *
   * These options are passed to the `Router.isActive()` function.
   *
   * @see {@link Router#isActive}
   */
  routerLinkActiveOptions = {
    exact: false
  };
  /**
   * Aria-current attribute to apply when the router link is active.
   *
   * Possible values: `'page'` | `'step'` | `'location'` | `'date'` | `'time'` | `true` | `false`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current}
   */
  ariaCurrentWhenActive;
  /**
   *
   * You can use the output `isActiveChange` to get notified each time the link becomes
   * active or inactive.
   *
   * Emits:
   * true  -> Route is active
   * false -> Route is inactive
   *
   * ```html
   * <a
   *  routerLink="/user/bob"
   *  routerLinkActive="active-link"
   *  (isActiveChange)="this.onRouterLinkActive($event)">Bob</a>
   * ```
   */
  isActiveChange = new EventEmitter();
  constructor(router, element, renderer, cdr, link2) {
    this.router = router;
    this.element = element;
    this.renderer = renderer;
    this.cdr = cdr;
    this.link = link2;
    this.routerEventsSubscription = router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    });
  }
  /** @nodoc */
  ngAfterContentInit() {
    (0, import_rxjs2.of)(this.links.changes, (0, import_rxjs2.of)(null)).pipe((0, import_operators2.mergeAll)()).subscribe((_) => {
      this.update();
      this.subscribeToEachLinkOnChanges();
    });
  }
  subscribeToEachLinkOnChanges() {
    this.linkInputChangesSubscription?.unsubscribe();
    const allLinkChanges = [...this.links.toArray(), this.link].filter((link2) => !!link2).map((link2) => link2.onChanges);
    this.linkInputChangesSubscription = (0, import_rxjs2.from)(allLinkChanges).pipe((0, import_operators2.mergeAll)()).subscribe((link2) => {
      if (this._isActive !== this.isLinkActive(this.router)(link2)) {
        this.update();
      }
    });
  }
  set routerLinkActive(data) {
    const classes = Array.isArray(data) ? data : data.split(" ");
    this.classes = classes.filter((c) => !!c);
  }
  /** @nodoc */
  ngOnChanges(changes) {
    this.update();
  }
  /** @nodoc */
  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
    this.linkInputChangesSubscription?.unsubscribe();
  }
  update() {
    if (!this.links || !this.router.navigated) return;
    queueMicrotask(() => {
      const hasActiveLinks = this.hasActiveLinks();
      this.classes.forEach((c) => {
        if (hasActiveLinks) {
          this.renderer.addClass(this.element.nativeElement, c);
        } else {
          this.renderer.removeClass(this.element.nativeElement, c);
        }
      });
      if (hasActiveLinks && this.ariaCurrentWhenActive !== void 0) {
        this.renderer.setAttribute(this.element.nativeElement, "aria-current", this.ariaCurrentWhenActive.toString());
      } else {
        this.renderer.removeAttribute(this.element.nativeElement, "aria-current");
      }
      if (this._isActive !== hasActiveLinks) {
        this._isActive = hasActiveLinks;
        this.cdr.markForCheck();
        this.isActiveChange.emit(hasActiveLinks);
      }
    });
  }
  isLinkActive(router) {
    const options = isActiveMatchOptions(this.routerLinkActiveOptions) ? this.routerLinkActiveOptions : (
      // While the types should disallow `undefined` here, it's possible without strict inputs
      this.routerLinkActiveOptions.exact || false
    );
    return (link2) => {
      const urlTree = link2.urlTree;
      return urlTree ? router.isActive(urlTree, options) : false;
    };
  }
  hasActiveLinks() {
    const isActiveCheckFn = this.isLinkActive(this.router);
    return this.link && isActiveCheckFn(this.link) || this.links.some(isActiveCheckFn);
  }
  static ɵfac = function RouterLinkActive_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouterLinkActive)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(RouterLink, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _RouterLinkActive,
    selectors: [["", "routerLinkActive", ""]],
    contentQueries: function RouterLinkActive_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, RouterLink, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.links = _t);
      }
    },
    inputs: {
      routerLinkActiveOptions: "routerLinkActiveOptions",
      ariaCurrentWhenActive: "ariaCurrentWhenActive",
      routerLinkActive: "routerLinkActive"
    },
    outputs: {
      isActiveChange: "isActiveChange"
    },
    exportAs: ["routerLinkActive"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkActive, [{
    type: Directive,
    args: [{
      selector: "[routerLinkActive]",
      exportAs: "routerLinkActive"
    }]
  }], () => [{
    type: Router
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ChangeDetectorRef
  }, {
    type: RouterLink,
    decorators: [{
      type: Optional
    }]
  }], {
    links: [{
      type: ContentChildren,
      args: [RouterLink, {
        descendants: true
      }]
    }],
    routerLinkActiveOptions: [{
      type: Input
    }],
    ariaCurrentWhenActive: [{
      type: Input
    }],
    isActiveChange: [{
      type: Output
    }],
    routerLinkActive: [{
      type: Input
    }]
  });
})();
function isActiveMatchOptions(options) {
  return !!options.paths;
}
var PreloadingStrategy = class {
};
var PreloadAllModules = class _PreloadAllModules {
  preload(route, fn) {
    return fn().pipe((0, import_operators2.catchError)(() => (0, import_rxjs2.of)(null)));
  }
  static ɵfac = function PreloadAllModules_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PreloadAllModules)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _PreloadAllModules,
    factory: _PreloadAllModules.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreloadAllModules, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NoPreloading = class _NoPreloading {
  preload(route, fn) {
    return (0, import_rxjs2.of)(null);
  }
  static ɵfac = function NoPreloading_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NoPreloading)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NoPreloading,
    factory: _NoPreloading.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoPreloading, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RouterPreloader = class _RouterPreloader {
  router;
  injector;
  preloadingStrategy;
  loader;
  subscription;
  constructor(router, compiler, injector, preloadingStrategy, loader) {
    this.router = router;
    this.injector = injector;
    this.preloadingStrategy = preloadingStrategy;
    this.loader = loader;
  }
  setUpPreloading() {
    this.subscription = this.router.events.pipe((0, import_operators2.filter)((e) => e instanceof NavigationEnd), (0, import_operators2.concatMap)(() => this.preload())).subscribe(() => {
    });
  }
  preload() {
    return this.processRoutes(this.injector, this.router.config);
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  processRoutes(injector, routes) {
    const res = [];
    for (const route of routes) {
      if (route.providers && !route._injector) {
        route._injector = createEnvironmentInjector(route.providers, injector, `Route: ${route.path}`);
      }
      const injectorForCurrentRoute = route._injector ?? injector;
      const injectorForChildren = route._loadedInjector ?? injectorForCurrentRoute;
      if (route.loadChildren && !route._loadedRoutes && route.canLoad === void 0 || route.loadComponent && !route._loadedComponent) {
        res.push(this.preloadConfig(injectorForCurrentRoute, route));
      }
      if (route.children || route._loadedRoutes) {
        res.push(this.processRoutes(injectorForChildren, route.children ?? route._loadedRoutes));
      }
    }
    return (0, import_rxjs2.from)(res).pipe((0, import_operators2.mergeAll)());
  }
  preloadConfig(injector, route) {
    return this.preloadingStrategy.preload(route, () => {
      let loadedChildren$;
      if (route.loadChildren && route.canLoad === void 0) {
        loadedChildren$ = this.loader.loadChildren(injector, route);
      } else {
        loadedChildren$ = (0, import_rxjs2.of)(null);
      }
      const recursiveLoadChildren$ = loadedChildren$.pipe((0, import_operators2.mergeMap)((config) => {
        if (config === null) {
          return (0, import_rxjs2.of)(void 0);
        }
        route._loadedRoutes = config.routes;
        route._loadedInjector = config.injector;
        return this.processRoutes(config.injector ?? injector, config.routes);
      }));
      if (route.loadComponent && !route._loadedComponent) {
        const loadComponent$ = this.loader.loadComponent(route);
        return (0, import_rxjs2.from)([recursiveLoadChildren$, loadComponent$]).pipe((0, import_operators2.mergeAll)());
      } else {
        return recursiveLoadChildren$;
      }
    });
  }
  static ɵfac = function RouterPreloader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouterPreloader)(ɵɵinject(Router), ɵɵinject(Compiler), ɵɵinject(EnvironmentInjector), ɵɵinject(PreloadingStrategy), ɵɵinject(RouterConfigLoader));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RouterPreloader,
    factory: _RouterPreloader.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterPreloader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Router
  }, {
    type: Compiler
  }, {
    type: EnvironmentInjector
  }, {
    type: PreloadingStrategy
  }, {
    type: RouterConfigLoader
  }], null);
})();
var ROUTER_SCROLLER = new InjectionToken("");
var RouterScroller = class _RouterScroller {
  urlSerializer;
  transitions;
  viewportScroller;
  zone;
  options;
  routerEventsSubscription;
  scrollEventsSubscription;
  lastId = 0;
  lastSource = "imperative";
  restoredId = 0;
  store = {};
  /** @nodoc */
  constructor(urlSerializer, transitions, viewportScroller, zone, options = {}) {
    this.urlSerializer = urlSerializer;
    this.transitions = transitions;
    this.viewportScroller = viewportScroller;
    this.zone = zone;
    this.options = options;
    options.scrollPositionRestoration ||= "disabled";
    options.anchorScrolling ||= "disabled";
  }
  init() {
    if (this.options.scrollPositionRestoration !== "disabled") {
      this.viewportScroller.setHistoryScrollRestoration("manual");
    }
    this.routerEventsSubscription = this.createScrollEvents();
    this.scrollEventsSubscription = this.consumeScrollEvents();
  }
  createScrollEvents() {
    return this.transitions.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.store[this.lastId] = this.viewportScroller.getScrollPosition();
        this.lastSource = e.navigationTrigger;
        this.restoredId = e.restoredState ? e.restoredState.navigationId : 0;
      } else if (e instanceof NavigationEnd) {
        this.lastId = e.id;
        this.scheduleScrollEvent(e, this.urlSerializer.parse(e.urlAfterRedirects).fragment);
      } else if (e instanceof NavigationSkipped && e.code === NavigationSkippedCode.IgnoredSameUrlNavigation) {
        this.lastSource = void 0;
        this.restoredId = 0;
        this.scheduleScrollEvent(e, this.urlSerializer.parse(e.url).fragment);
      }
    });
  }
  consumeScrollEvents() {
    return this.transitions.events.subscribe((e) => {
      if (!(e instanceof Scroll)) return;
      if (e.position) {
        if (this.options.scrollPositionRestoration === "top") {
          this.viewportScroller.scrollToPosition([0, 0]);
        } else if (this.options.scrollPositionRestoration === "enabled") {
          this.viewportScroller.scrollToPosition(e.position);
        }
      } else {
        if (e.anchor && this.options.anchorScrolling === "enabled") {
          this.viewportScroller.scrollToAnchor(e.anchor);
        } else if (this.options.scrollPositionRestoration !== "disabled") {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      }
    });
  }
  scheduleScrollEvent(routerEvent, anchor) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.transitions.events.next(new Scroll(routerEvent, this.lastSource === "popstate" ? this.store[this.restoredId] : null, anchor));
        });
      }, 0);
    });
  }
  /** @nodoc */
  ngOnDestroy() {
    this.routerEventsSubscription?.unsubscribe();
    this.scrollEventsSubscription?.unsubscribe();
  }
  static ɵfac = function RouterScroller_Factory(__ngFactoryType__) {
    ɵɵinvalidFactory();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _RouterScroller,
    factory: _RouterScroller.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterScroller, [{
    type: Injectable
  }], () => [{
    type: UrlSerializer
  }, {
    type: NavigationTransitions
  }, {
    type: ViewportScroller
  }, {
    type: NgZone
  }, {
    type: void 0
  }], null);
})();
function rootRoute(router) {
  return router.routerState.root;
}
function routerFeature(kind, providers) {
  return {
    ɵkind: kind,
    ɵproviders: providers
  };
}
var ROUTER_IS_PROVIDED = new InjectionToken("", {
  providedIn: "root",
  factory: () => false
});
function getBootstrapListener() {
  const injector = inject(Injector);
  return (bootstrappedComponentRef) => {
    const ref = injector.get(ApplicationRef);
    if (bootstrappedComponentRef !== ref.components[0]) {
      return;
    }
    const router = injector.get(Router);
    const bootstrapDone = injector.get(BOOTSTRAP_DONE);
    if (injector.get(INITIAL_NAVIGATION) === 1) {
      router.initialNavigation();
    }
    injector.get(ROUTER_PRELOADER, null, InjectFlags.Optional)?.setUpPreloading();
    injector.get(ROUTER_SCROLLER, null, InjectFlags.Optional)?.init();
    router.resetRootComponentType(ref.componentTypes[0]);
    if (!bootstrapDone.closed) {
      bootstrapDone.next();
      bootstrapDone.complete();
      bootstrapDone.unsubscribe();
    }
  };
}
var BOOTSTRAP_DONE = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "bootstrap done indicator" : "", {
  factory: () => {
    return new import_rxjs2.Subject();
  }
});
var INITIAL_NAVIGATION = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "initial navigation" : "", {
  providedIn: "root",
  factory: () => 1
  /* InitialNavigation.EnabledNonBlocking */
});
function withEnabledBlockingInitialNavigation() {
  const providers = [{
    provide: INITIAL_NAVIGATION,
    useValue: 0
    /* InitialNavigation.EnabledBlocking */
  }, provideAppInitializer(() => {
    const injector = inject(Injector);
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve());
    return locationInitialized.then(() => {
      return new Promise((resolve2) => {
        const router = injector.get(Router);
        const bootstrapDone = injector.get(BOOTSTRAP_DONE);
        afterNextNavigation(router, () => {
          resolve2(true);
        });
        injector.get(NavigationTransitions).afterPreactivation = () => {
          resolve2(true);
          return bootstrapDone.closed ? (0, import_rxjs2.of)(void 0) : bootstrapDone;
        };
        router.initialNavigation();
      });
    });
  })];
  return routerFeature(2, providers);
}
function withDisabledInitialNavigation() {
  const providers = [provideAppInitializer(() => {
    inject(Router).setUpLocationChangeListener();
  }), {
    provide: INITIAL_NAVIGATION,
    useValue: 2
    /* InitialNavigation.Disabled */
  }];
  return routerFeature(3, providers);
}
function withDebugTracing() {
  let providers = [];
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    providers = [{
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const router = inject(Router);
        return () => router.events.subscribe((e) => {
          console.group?.(`Router Event: ${e.constructor.name}`);
          console.log(stringifyEvent(e));
          console.log(e);
          console.groupEnd?.();
        });
      }
    }];
  } else {
    providers = [];
  }
  return routerFeature(1, providers);
}
var ROUTER_PRELOADER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router preloader" : "");
function withPreloading(preloadingStrategy) {
  const providers = [{
    provide: ROUTER_PRELOADER,
    useExisting: RouterPreloader
  }, {
    provide: PreloadingStrategy,
    useExisting: preloadingStrategy
  }];
  return routerFeature(0, providers);
}
function withComponentInputBinding() {
  const providers = [RoutedComponentInputBinder, {
    provide: INPUT_BINDER,
    useExisting: RoutedComponentInputBinder
  }];
  return routerFeature(8, providers);
}
function withViewTransitions(options) {
  performanceMarkFeature("NgRouterViewTransitions");
  const providers = [{
    provide: CREATE_VIEW_TRANSITION,
    useValue: createViewTransition
  }, {
    provide: VIEW_TRANSITION_OPTIONS,
    useValue: __spreadValues({
      skipNextTransition: !!options?.skipInitialTransition
    }, options)
  }];
  return routerFeature(9, providers);
}
var ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkActive, ɵEmptyOutletComponent];
var ROUTER_FORROOT_GUARD = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router duplicate forRoot guard" : "");
var ROUTER_PROVIDERS = [
  Location,
  {
    provide: UrlSerializer,
    useClass: DefaultUrlSerializer
  },
  Router,
  ChildrenOutletContexts,
  {
    provide: ActivatedRoute,
    useFactory: rootRoute,
    deps: [Router]
  },
  RouterConfigLoader,
  // Only used to warn when `provideRoutes` is used without `RouterModule` or `provideRouter`. Can
  // be removed when `provideRoutes` is removed.
  typeof ngDevMode === "undefined" || ngDevMode ? {
    provide: ROUTER_IS_PROVIDED,
    useValue: true
  } : []
];
var RouterModule = class _RouterModule {
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      inject(ROUTER_FORROOT_GUARD, {
        optional: true
      });
    }
  }
  /**
   * Creates and configures a module with all the router providers and directives.
   * Optionally sets up an application listener to perform an initial navigation.
   *
   * When registering the NgModule at the root, import as follows:
   *
   * ```ts
   * @NgModule({
   *   imports: [RouterModule.forRoot(ROUTES)]
   * })
   * class MyNgModule {}
   * ```
   *
   * @param routes An array of `Route` objects that define the navigation paths for the application.
   * @param config An `ExtraOptions` configuration object that controls how navigation is performed.
   * @return The new `NgModule`.
   *
   */
  static forRoot(routes, config) {
    return {
      ngModule: _RouterModule,
      providers: [ROUTER_PROVIDERS, typeof ngDevMode === "undefined" || ngDevMode ? config?.enableTracing ? withDebugTracing().ɵproviders : [] : [], {
        provide: ROUTES,
        multi: true,
        useValue: routes
      }, typeof ngDevMode === "undefined" || ngDevMode ? {
        provide: ROUTER_FORROOT_GUARD,
        useFactory: provideForRootGuard,
        deps: [[Router, new Optional(), new SkipSelf()]]
      } : [], config?.errorHandler ? {
        provide: NAVIGATION_ERROR_HANDLER,
        useValue: config.errorHandler
      } : [], {
        provide: ROUTER_CONFIGURATION,
        useValue: config ? config : {}
      }, config?.useHash ? provideHashLocationStrategy() : providePathLocationStrategy(), provideRouterScroller(), config?.preloadingStrategy ? withPreloading(config.preloadingStrategy).ɵproviders : [], config?.initialNavigation ? provideInitialNavigation(config) : [], config?.bindToComponentInputs ? withComponentInputBinding().ɵproviders : [], config?.enableViewTransitions ? withViewTransitions().ɵproviders : [], provideRouterInitializer()]
    };
  }
  /**
   * Creates a module with all the router directives and a provider registering routes,
   * without creating a new Router service.
   * When registering for submodules and lazy-loaded submodules, create the NgModule as follows:
   *
   * ```ts
   * @NgModule({
   *   imports: [RouterModule.forChild(ROUTES)]
   * })
   * class MyNgModule {}
   * ```
   *
   * @param routes An array of `Route` objects that define the navigation paths for the submodule.
   * @return The new NgModule.
   *
   */
  static forChild(routes) {
    return {
      ngModule: _RouterModule,
      providers: [{
        provide: ROUTES,
        multi: true,
        useValue: routes
      }]
    };
  }
  static ɵfac = function RouterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RouterModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _RouterModule,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ɵEmptyOutletComponent],
    exports: [RouterOutlet, RouterLink, RouterLinkActive, ɵEmptyOutletComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterModule, [{
    type: NgModule,
    args: [{
      imports: ROUTER_DIRECTIVES,
      exports: ROUTER_DIRECTIVES
    }]
  }], () => [], null);
})();
function provideRouterScroller() {
  return {
    provide: ROUTER_SCROLLER,
    useFactory: () => {
      const viewportScroller = inject(ViewportScroller);
      const zone = inject(NgZone);
      const config = inject(ROUTER_CONFIGURATION);
      const transitions = inject(NavigationTransitions);
      const urlSerializer = inject(UrlSerializer);
      if (config.scrollOffset) {
        viewportScroller.setOffset(config.scrollOffset);
      }
      return new RouterScroller(urlSerializer, transitions, viewportScroller, zone, config);
    }
  };
}
function provideHashLocationStrategy() {
  return {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  };
}
function providePathLocationStrategy() {
  return {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  };
}
function provideForRootGuard(router) {
  if (router) {
    throw new RuntimeError(4007, `The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.`);
  }
  return "guarded";
}
function provideInitialNavigation(config) {
  return [config.initialNavigation === "disabled" ? withDisabledInitialNavigation().ɵproviders : [], config.initialNavigation === "enabledBlocking" ? withEnabledBlockingInitialNavigation().ɵproviders : []];
}
var ROUTER_INITIALIZER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "Router Initializer" : "");
function provideRouterInitializer() {
  return [
    // ROUTER_INITIALIZER token should be removed. It's public API but shouldn't be. We can just
    // have `getBootstrapListener` directly attached to APP_BOOTSTRAP_LISTENER.
    {
      provide: ROUTER_INITIALIZER,
      useFactory: getBootstrapListener
    },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useExisting: ROUTER_INITIALIZER
    }
  ];
}

// node_modules/@angular/router/fesm2022/router.mjs
var import_rxjs3 = __toESM(require_cjs(), 1);
var import_operators3 = __toESM(require_operators(), 1);
var VERSION = new Version("19.2.7");

// node_modules/@angular/ssr/third_party/beasties/index.js
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn = () => {
    throw createNotImplementedError(name);
  };
  return Object.assign(fn, {
    __unenv__: true
  });
}
var access = notImplemented("fs.access");
var copyFile = notImplemented("fs.copyFile");
var cp = notImplemented("fs.cp");
var open = notImplemented("fs.open");
var opendir = notImplemented("fs.opendir");
var rename = notImplemented("fs.rename");
var truncate = notImplemented("fs.truncate");
var rm = notImplemented("fs.rm");
var rmdir = notImplemented("fs.rmdir");
var mkdir = notImplemented("fs.mkdir");
var readdir = notImplemented("fs.readdir");
var readlink = notImplemented("fs.readlink");
var symlink = notImplemented("fs.symlink");
var lstat = notImplemented("fs.lstat");
var stat = notImplemented("fs.stat");
var link = notImplemented("fs.link");
var unlink = notImplemented("fs.unlink");
var chmod = notImplemented("fs.chmod");
var lchmod = notImplemented("fs.lchmod");
var lchown = notImplemented("fs.lchown");
var chown = notImplemented("fs.chown");
var utimes = notImplemented("fs.utimes");
var lutimes = notImplemented("fs.lutimes");
var realpath = notImplemented("fs.realpath");
var mkdtemp = notImplemented("fs.mkdtemp");
var writeFile = notImplemented("fs.writeFile");
var appendFile = notImplemented("fs.appendFile");
var readFile$1 = notImplemented("fs.readFile");
notImplemented("fs.watch");
var statfs = notImplemented("fs.statfs");
function notImplementedAsync(name) {
  const fn = notImplemented(name);
  fn.__promisify__ = () => notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
function callbackify(fn) {
  const fnc = function(...args) {
    const cb = args.pop();
    fn().catch((error) => cb(error)).then((val) => cb(void 0, val));
  };
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
callbackify(access);
callbackify(appendFile);
callbackify(chown);
callbackify(chmod);
callbackify(copyFile);
callbackify(cp);
callbackify(lchown);
callbackify(lchmod);
callbackify(link);
callbackify(lstat);
callbackify(lutimes);
callbackify(mkdir);
callbackify(mkdtemp);
callbackify(realpath);
callbackify(open);
callbackify(opendir);
callbackify(readdir);
var readFile = callbackify(readFile$1);
callbackify(readlink);
callbackify(rename);
callbackify(rm);
callbackify(rmdir);
callbackify(stat);
callbackify(symlink);
callbackify(truncate);
callbackify(unlink);
callbackify(utimes);
callbackify(writeFile);
callbackify(statfs);
notImplementedAsync("fs.close");
notImplementedAsync("fs.createReadStream");
notImplementedAsync("fs.createWriteStream");
notImplementedAsync("fs.exists");
notImplementedAsync("fs.fchown");
notImplementedAsync("fs.fchmod");
notImplementedAsync("fs.fdatasync");
notImplementedAsync("fs.fstat");
notImplementedAsync("fs.fsync");
notImplementedAsync("fs.ftruncate");
notImplementedAsync("fs.futimes");
notImplementedAsync("fs.lstatSync");
notImplementedAsync("fs.read");
notImplementedAsync("fs.readv");
notImplementedAsync("fs.realpathSync");
notImplementedAsync("fs.statSync");
notImplementedAsync("fs.unwatchFile");
notImplementedAsync("fs.watch");
notImplementedAsync("fs.watchFile");
notImplementedAsync("fs.write");
notImplementedAsync("fs.writev");
notImplementedAsync("fs._toUnixTimestamp");
notImplementedAsync("fs.openAsBlob");
notImplemented("fs.appendFileSync");
notImplemented("fs.accessSync");
notImplemented("fs.chownSync");
notImplemented("fs.chmodSync");
notImplemented("fs.closeSync");
notImplemented("fs.copyFileSync");
notImplemented("fs.cpSync");
notImplemented("fs.fchownSync");
notImplemented("fs.fchmodSync");
notImplemented("fs.fdatasyncSync");
notImplemented("fs.fstatSync");
notImplemented("fs.fsyncSync");
notImplemented("fs.ftruncateSync");
notImplemented("fs.futimesSync");
notImplemented("fs.lchownSync");
notImplemented("fs.lchmodSync");
notImplemented("fs.linkSync");
notImplemented("fs.lutimesSync");
notImplemented("fs.mkdirSync");
notImplemented("fs.mkdtempSync");
notImplemented("fs.openSync");
notImplemented("fs.opendirSync");
notImplemented("fs.readdirSync");
notImplemented("fs.readSync");
notImplemented("fs.readvSync");
notImplemented("fs.readFileSync");
notImplemented("fs.readlinkSync");
notImplemented("fs.renameSync");
notImplemented("fs.rmSync");
notImplemented("fs.rmdirSync");
notImplemented("fs.symlinkSync");
notImplemented("fs.truncateSync");
notImplemented("fs.unlinkSync");
notImplemented("fs.utimesSync");
notImplemented("fs.writeFileSync");
notImplemented("fs.writeSync");
notImplemented("fs.writevSync");
notImplemented("fs.statfsSync");
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input3 = "") {
  if (!input3) {
    return input3;
  }
  return input3.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
var sep = "/";
var delimiter = ":";
var normalize = function(path2) {
  if (path2.length === 0) {
    return ".";
  }
  path2 = normalizeWindowsPath(path2);
  const isUNCPath = path2.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path2);
  const trailingSeparator = path2[path2.length - 1] === "/";
  path2 = normalizeString(path2, !isPathAbsolute);
  if (path2.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path2 += "/";
  }
  if (_DRIVE_LETTER_RE.test(path2)) {
    path2 += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path2}`;
    }
    return `//${path2}`;
  }
  return isPathAbsolute && !isAbsolute(path2) ? `/${path2}` : path2;
};
var join = function(...arguments_) {
  if (arguments_.length === 0) {
    return ".";
  }
  let joined;
  for (const argument of arguments_) {
    if (argument && argument.length > 0) {
      if (joined === void 0) {
        joined = argument;
      } else {
        joined += `/${argument}`;
      }
    }
  }
  if (joined === void 0) {
    return ".";
  }
  return normalize(joined.replace(/\/\/+/g, "/"));
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path2 = index >= 0 ? arguments_[index] : cwd();
    if (!path2 || path2.length === 0) {
      continue;
    }
    resolvedPath = `${path2}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path2);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path2.length; ++index) {
    if (index < path2.length) {
      char = path2[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, index)}`;
        } else {
          res = path2.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var toNamespacedPath = function(p) {
  return normalizeWindowsPath(p);
};
var _EXTNAME_RE = /.(\.[^./]+)$/;
var extname = function(p) {
  const match2 = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match2 && match2[1] || "";
};
var relative = function(from3, to) {
  const _from = resolve(from3).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
var dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
var format = function(p) {
  const segments = [p.root, p.dir, p.base ?? p.name + p.ext].filter(Boolean);
  return normalizeWindowsPath(p.root ? resolve(...segments) : segments.join("/"));
};
var basename = function(p, extension) {
  const lastSegment = normalizeWindowsPath(p).split("/").pop();
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};
var parse$3 = function(p) {
  const root2 = normalizeWindowsPath(p).split("/").shift() || "/";
  const base = basename(p);
  const extension = extname(base);
  return {
    root: root2,
    dir: dirname(p),
    base,
    ext: extension,
    name: base.slice(0, base.length - extension.length)
  };
};
var path = {
  __proto__: null,
  basename,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  normalizeString,
  parse: parse$3,
  relative,
  resolve,
  sep,
  toNamespacedPath
};
var _path = Object.freeze({
  __proto__: null,
  basename,
  default: path,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  normalizeString,
  parse: parse$3,
  relative,
  resolve,
  sep,
  toNamespacedPath
});
var _pathModule = __spreadProps(__spreadValues({}, _path), {
  platform: "posix",
  posix: void 0,
  win32: void 0
});
_pathModule.posix = _pathModule;
_pathModule.win32 = _pathModule;
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", {
    value: true
  });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var picocolors_browser = {
  exports: {}
};
var hasRequiredPicocolors_browser;
function requirePicocolors_browser() {
  if (hasRequiredPicocolors_browser) return picocolors_browser.exports;
  hasRequiredPicocolors_browser = 1;
  var x = String;
  var create = function() {
    return {
      isColorSupported: false,
      reset: x,
      bold: x,
      dim: x,
      italic: x,
      underline: x,
      inverse: x,
      hidden: x,
      strikethrough: x,
      black: x,
      red: x,
      green: x,
      yellow: x,
      blue: x,
      magenta: x,
      cyan: x,
      white: x,
      gray: x,
      bgBlack: x,
      bgRed: x,
      bgGreen: x,
      bgYellow: x,
      bgBlue: x,
      bgMagenta: x,
      bgCyan: x,
      bgWhite: x,
      blackBright: x,
      redBright: x,
      greenBright: x,
      yellowBright: x,
      blueBright: x,
      magentaBright: x,
      cyanBright: x,
      whiteBright: x,
      bgBlackBright: x,
      bgRedBright: x,
      bgGreenBright: x,
      bgYellowBright: x,
      bgBlueBright: x,
      bgMagentaBright: x,
      bgCyanBright: x,
      bgWhiteBright: x
    };
  };
  picocolors_browser.exports = create();
  picocolors_browser.exports.createColors = create;
  return picocolors_browser.exports;
}
var _nodeResolve_empty = {};
var _nodeResolve_empty$1 = Object.freeze({
  __proto__: null,
  default: _nodeResolve_empty
});
var require$$2 = getAugmentedNamespace(_nodeResolve_empty$1);
var cssSyntaxError;
var hasRequiredCssSyntaxError;
function requireCssSyntaxError() {
  if (hasRequiredCssSyntaxError) return cssSyntaxError;
  hasRequiredCssSyntaxError = 1;
  let pico = requirePicocolors_browser();
  let terminalHighlight = require$$2;
  class CssSyntaxError extends Error {
    constructor(message, line, column, source, file, plugin) {
      super(message);
      this.name = "CssSyntaxError";
      this.reason = message;
      if (file) {
        this.file = file;
      }
      if (source) {
        this.source = source;
      }
      if (plugin) {
        this.plugin = plugin;
      }
      if (typeof line !== "undefined" && typeof column !== "undefined") {
        if (typeof line === "number") {
          this.line = line;
          this.column = column;
        } else {
          this.line = line.line;
          this.column = line.column;
          this.endLine = column.line;
          this.endColumn = column.column;
        }
      }
      this.setMessage();
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CssSyntaxError);
      }
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "";
      this.message += this.file ? this.file : "<css input>";
      if (typeof this.line !== "undefined") {
        this.message += ":" + this.line + ":" + this.column;
      }
      this.message += ": " + this.reason;
    }
    showSourceCode(color) {
      if (!this.source) return "";
      let css = this.source;
      if (color == null) color = pico.isColorSupported;
      let aside = (text) => text;
      let mark = (text) => text;
      let highlight = (text) => text;
      if (color) {
        let {
          bold,
          gray,
          red
        } = pico.createColors(true);
        mark = (text) => bold(red(text));
        aside = (text) => gray(text);
        if (terminalHighlight) {
          highlight = (text) => terminalHighlight(text);
        }
      }
      let lines = css.split(/\r?\n/);
      let start = Math.max(this.line - 3, 0);
      let end = Math.min(this.line + 2, lines.length);
      let maxWidth = String(end).length;
      return lines.slice(start, end).map((line, index) => {
        let number = start + 1 + index;
        let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
        if (number === this.line) {
          if (line.length > 160) {
            let padding = 20;
            let subLineStart = Math.max(0, this.column - padding);
            let subLineEnd = Math.max(this.column + padding, this.endColumn + padding);
            let subLine = line.slice(subLineStart, subLineEnd);
            let spacing2 = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, padding - 1)).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing2 + mark("^");
          }
          let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
        }
        return " " + aside(gutter) + highlight(line);
      }).join("\n");
    }
    toString() {
      let code = this.showSourceCode();
      if (code) {
        code = "\n\n" + code + "\n";
      }
      return this.name + ": " + this.message + code;
    }
  }
  cssSyntaxError = CssSyntaxError;
  CssSyntaxError.default = CssSyntaxError;
  return cssSyntaxError;
}
var stringifier;
var hasRequiredStringifier;
function requireStringifier() {
  if (hasRequiredStringifier) return stringifier;
  hasRequiredStringifier = 1;
  const DEFAULT_RAW = {
    after: "\n",
    beforeClose: "\n",
    beforeComment: "\n",
    beforeDecl: "\n",
    beforeOpen: " ",
    beforeRule: "\n",
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: false
  };
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  class Stringifier {
    constructor(builder) {
      this.builder = builder;
    }
    atrule(node2, semicolon) {
      let name = "@" + node2.name;
      let params = node2.params ? this.rawValue(node2, "params") : "";
      if (typeof node2.raws.afterName !== "undefined") {
        name += node2.raws.afterName;
      } else if (params) {
        name += " ";
      }
      if (node2.nodes) {
        this.block(node2, name + params);
      } else {
        let end = (node2.raws.between || "") + (semicolon ? ";" : "");
        this.builder(name + params + end, node2);
      }
    }
    beforeAfter(node2, detect) {
      let value;
      if (node2.type === "decl") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (node2.type === "comment") {
        value = this.raw(node2, null, "beforeComment");
      } else if (detect === "before") {
        value = this.raw(node2, null, "beforeRule");
      } else {
        value = this.raw(node2, null, "beforeClose");
      }
      let buf = node2.parent;
      let depth = 0;
      while (buf && buf.type !== "root") {
        depth += 1;
        buf = buf.parent;
      }
      if (value.includes("\n")) {
        let indent = this.raw(node2, null, "indent");
        if (indent.length) {
          for (let step = 0; step < depth; step++) value += indent;
        }
      }
      return value;
    }
    block(node2, start) {
      let between = this.raw(node2, "between", "beforeOpen");
      this.builder(start + between + "{", node2, "start");
      let after;
      if (node2.nodes && node2.nodes.length) {
        this.body(node2);
        after = this.raw(node2, "after");
      } else {
        after = this.raw(node2, "after", "emptyBody");
      }
      if (after) this.builder(after);
      this.builder("}", node2, "end");
    }
    body(node2) {
      let last2 = node2.nodes.length - 1;
      while (last2 > 0) {
        if (node2.nodes[last2].type !== "comment") break;
        last2 -= 1;
      }
      let semicolon = this.raw(node2, "semicolon");
      for (let i = 0; i < node2.nodes.length; i++) {
        let child = node2.nodes[i];
        let before = this.raw(child, "before");
        if (before) this.builder(before);
        this.stringify(child, last2 !== i || semicolon);
      }
    }
    comment(node2) {
      let left = this.raw(node2, "left", "commentLeft");
      let right = this.raw(node2, "right", "commentRight");
      this.builder("/*" + left + node2.text + right + "*/", node2);
    }
    decl(node2, semicolon) {
      let between = this.raw(node2, "between", "colon");
      let string = node2.prop + between + this.rawValue(node2, "value");
      if (node2.important) {
        string += node2.raws.important || " !important";
      }
      if (semicolon) string += ";";
      this.builder(string, node2);
    }
    document(node2) {
      this.body(node2);
    }
    raw(node2, own, detect) {
      let value;
      if (!detect) detect = own;
      if (own) {
        value = node2.raws[own];
        if (typeof value !== "undefined") return value;
      }
      let parent = node2.parent;
      if (detect === "before") {
        if (!parent || parent.type === "root" && parent.first === node2) {
          return "";
        }
        if (parent && parent.type === "document") {
          return "";
        }
      }
      if (!parent) return DEFAULT_RAW[detect];
      let root2 = node2.root();
      if (!root2.rawCache) root2.rawCache = {};
      if (typeof root2.rawCache[detect] !== "undefined") {
        return root2.rawCache[detect];
      }
      if (detect === "before" || detect === "after") {
        return this.beforeAfter(node2, detect);
      } else {
        let method = "raw" + capitalize(detect);
        if (this[method]) {
          value = this[method](root2, node2);
        } else {
          root2.walk((i) => {
            value = i.raws[own];
            if (typeof value !== "undefined") return false;
          });
        }
      }
      if (typeof value === "undefined") value = DEFAULT_RAW[detect];
      root2.rawCache[detect] = value;
      return value;
    }
    rawBeforeClose(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && i.nodes.length > 0) {
          if (typeof i.raws.after !== "undefined") {
            value = i.raws.after;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
    rawBeforeComment(root2, node2) {
      let value;
      root2.walkComments((i) => {
        if (typeof i.raws.before !== "undefined") {
          value = i.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
    rawBeforeDecl(root2, node2) {
      let value;
      root2.walkDecls((i) => {
        if (typeof i.raws.before !== "undefined") {
          value = i.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeRule");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
    rawBeforeOpen(root2) {
      let value;
      root2.walk((i) => {
        if (i.type !== "decl") {
          value = i.raws.between;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
    rawBeforeRule(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
    rawColon(root2) {
      let value;
      root2.walkDecls((i) => {
        if (typeof i.raws.between !== "undefined") {
          value = i.raws.between.replace(/[^\s:]/g, "");
          return false;
        }
      });
      return value;
    }
    rawEmptyBody(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && i.nodes.length === 0) {
          value = i.raws.after;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
    rawIndent(root2) {
      if (root2.raws.indent) return root2.raws.indent;
      let value;
      root2.walk((i) => {
        let p = i.parent;
        if (p && p !== root2 && p.parent && p.parent === root2) {
          if (typeof i.raws.before !== "undefined") {
            let parts = i.raws.before.split("\n");
            value = parts[parts.length - 1];
            value = value.replace(/\S/g, "");
            return false;
          }
        }
      });
      return value;
    }
    rawSemicolon(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && i.nodes.length && i.last.type === "decl") {
          value = i.raws.semicolon;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
    rawValue(node2, prop) {
      let value = node2[prop];
      let raw = node2.raws[prop];
      if (raw && raw.value === value) {
        return raw.raw;
      }
      return value;
    }
    root(node2) {
      this.body(node2);
      if (node2.raws.after) this.builder(node2.raws.after);
    }
    rule(node2) {
      this.block(node2, this.rawValue(node2, "selector"));
      if (node2.raws.ownSemicolon) {
        this.builder(node2.raws.ownSemicolon, node2, "end");
      }
    }
    stringify(node2, semicolon) {
      if (!this[node2.type]) {
        throw new Error("Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier.");
      }
      this[node2.type](node2, semicolon);
    }
  }
  stringifier = Stringifier;
  Stringifier.default = Stringifier;
  return stringifier;
}
var stringify_1;
var hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify_1;
  hasRequiredStringify = 1;
  let Stringifier = requireStringifier();
  function stringify3(node2, builder) {
    let str = new Stringifier(builder);
    str.stringify(node2);
  }
  stringify_1 = stringify3;
  stringify3.default = stringify3;
  return stringify_1;
}
var symbols = {};
var hasRequiredSymbols;
function requireSymbols() {
  if (hasRequiredSymbols) return symbols;
  hasRequiredSymbols = 1;
  symbols.isClean = Symbol("isClean");
  symbols.my = Symbol("my");
  return symbols;
}
var node;
var hasRequiredNode$1;
function requireNode$1() {
  if (hasRequiredNode$1) return node;
  hasRequiredNode$1 = 1;
  let CssSyntaxError = requireCssSyntaxError();
  let Stringifier = requireStringifier();
  let stringify3 = requireStringify();
  let {
    isClean,
    my
  } = requireSymbols();
  function cloneNode2(obj, parent) {
    let cloned = new obj.constructor();
    for (let i in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, i)) {
        continue;
      }
      if (i === "proxyCache") continue;
      let value = obj[i];
      let type = typeof value;
      if (i === "parent" && type === "object") {
        if (parent) cloned[i] = parent;
      } else if (i === "source") {
        cloned[i] = value;
      } else if (Array.isArray(value)) {
        cloned[i] = value.map((j) => cloneNode2(j, cloned));
      } else {
        if (type === "object" && value !== null) value = cloneNode2(value);
        cloned[i] = value;
      }
    }
    return cloned;
  }
  function sourceOffset(inputCSS, position) {
    if (position && typeof position.offset !== "undefined") {
      return position.offset;
    }
    let column = 1;
    let line = 1;
    let offset = 0;
    for (let i = 0; i < inputCSS.length; i++) {
      if (line === position.line && column === position.column) {
        offset = i;
        break;
      }
      if (inputCSS[i] === "\n") {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }
    return offset;
  }
  class Node2 {
    constructor(defaults = {}) {
      this.raws = {};
      this[isClean] = false;
      this[my] = true;
      for (let name in defaults) {
        if (name === "nodes") {
          this.nodes = [];
          for (let node2 of defaults[name]) {
            if (typeof node2.clone === "function") {
              this.append(node2.clone());
            } else {
              this.append(node2);
            }
          }
        } else {
          this[name] = defaults[name];
        }
      }
    }
    addToError(error) {
      error.postcssNode = this;
      if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
        let s = this.source;
        error.stack = error.stack.replace(/\n\s{4}at /, `$&${s.input.from}:${s.start.line}:${s.start.column}$&`);
      }
      return error;
    }
    after(add) {
      this.parent.insertAfter(this, add);
      return this;
    }
    assign(overrides = {}) {
      for (let name in overrides) {
        this[name] = overrides[name];
      }
      return this;
    }
    before(add) {
      this.parent.insertBefore(this, add);
      return this;
    }
    cleanRaws(keepBetween) {
      delete this.raws.before;
      delete this.raws.after;
      if (!keepBetween) delete this.raws.between;
    }
    clone(overrides = {}) {
      let cloned = cloneNode2(this);
      for (let name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    }
    cloneAfter(overrides = {}) {
      let cloned = this.clone(overrides);
      this.parent.insertAfter(this, cloned);
      return cloned;
    }
    cloneBefore(overrides = {}) {
      let cloned = this.clone(overrides);
      this.parent.insertBefore(this, cloned);
      return cloned;
    }
    error(message, opts = {}) {
      if (this.source) {
        let {
          end,
          start
        } = this.rangeBy(opts);
        return this.source.input.error(message, {
          column: start.column,
          line: start.line
        }, {
          column: end.column,
          line: end.line
        }, opts);
      }
      return new CssSyntaxError(message);
    }
    getProxyProcessor() {
      return {
        get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (prop === "root") {
            return () => node2.root().toProxy();
          } else {
            return node2[prop];
          }
        },
        set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
          prop === "text") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
    /* c8 ignore next 3 */
    markClean() {
      this[isClean] = true;
    }
    markDirty() {
      if (this[isClean]) {
        this[isClean] = false;
        let next = this;
        while (next = next.parent) {
          next[isClean] = false;
        }
      }
    }
    next() {
      if (!this.parent) return void 0;
      let index = this.parent.index(this);
      return this.parent.nodes[index + 1];
    }
    positionBy(opts) {
      let pos = this.source.start;
      if (opts.index) {
        pos = this.positionInside(opts.index);
      } else if (opts.word) {
        let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
        let stringRepresentation = inputString.slice(sourceOffset(inputString, this.source.start), sourceOffset(inputString, this.source.end));
        let index = stringRepresentation.indexOf(opts.word);
        if (index !== -1) pos = this.positionInside(index);
      }
      return pos;
    }
    positionInside(index) {
      let column = this.source.start.column;
      let line = this.source.start.line;
      let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
      let offset = sourceOffset(inputString, this.source.start);
      let end = offset + index;
      for (let i = offset; i < end; i++) {
        if (inputString[i] === "\n") {
          column = 1;
          line += 1;
        } else {
          column += 1;
        }
      }
      return {
        column,
        line
      };
    }
    prev() {
      if (!this.parent) return void 0;
      let index = this.parent.index(this);
      return this.parent.nodes[index - 1];
    }
    rangeBy(opts) {
      let start = {
        column: this.source.start.column,
        line: this.source.start.line
      };
      let end = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line
      } : {
        column: start.column + 1,
        line: start.line
      };
      if (opts.word) {
        let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
        let stringRepresentation = inputString.slice(sourceOffset(inputString, this.source.start), sourceOffset(inputString, this.source.end));
        let index = stringRepresentation.indexOf(opts.word);
        if (index !== -1) {
          start = this.positionInside(index);
          end = this.positionInside(index + opts.word.length);
        }
      } else {
        if (opts.start) {
          start = {
            column: opts.start.column,
            line: opts.start.line
          };
        } else if (opts.index) {
          start = this.positionInside(opts.index);
        }
        if (opts.end) {
          end = {
            column: opts.end.column,
            line: opts.end.line
          };
        } else if (typeof opts.endIndex === "number") {
          end = this.positionInside(opts.endIndex);
        } else if (opts.index) {
          end = this.positionInside(opts.index + 1);
        }
      }
      if (end.line < start.line || end.line === start.line && end.column <= start.column) {
        end = {
          column: start.column + 1,
          line: start.line
        };
      }
      return {
        end,
        start
      };
    }
    raw(prop, defaultType) {
      let str = new Stringifier();
      return str.raw(this, prop, defaultType);
    }
    remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.parent = void 0;
      return this;
    }
    replaceWith(...nodes) {
      if (this.parent) {
        let bookmark = this;
        let foundSelf = false;
        for (let node2 of nodes) {
          if (node2 === this) {
            foundSelf = true;
          } else if (foundSelf) {
            this.parent.insertAfter(bookmark, node2);
            bookmark = node2;
          } else {
            this.parent.insertBefore(bookmark, node2);
          }
        }
        if (!foundSelf) {
          this.remove();
        }
      }
      return this;
    }
    root() {
      let result2 = this;
      while (result2.parent && result2.parent.type !== "document") {
        result2 = result2.parent;
      }
      return result2;
    }
    toJSON(_, inputs) {
      let fixed = {};
      let emitInputs = inputs == null;
      inputs = inputs || /* @__PURE__ */ new Map();
      let inputsNextIndex = 0;
      for (let name in this) {
        if (!Object.prototype.hasOwnProperty.call(this, name)) {
          continue;
        }
        if (name === "parent" || name === "proxyCache") continue;
        let value = this[name];
        if (Array.isArray(value)) {
          fixed[name] = value.map((i) => {
            if (typeof i === "object" && i.toJSON) {
              return i.toJSON(null, inputs);
            } else {
              return i;
            }
          });
        } else if (typeof value === "object" && value.toJSON) {
          fixed[name] = value.toJSON(null, inputs);
        } else if (name === "source") {
          let inputId = inputs.get(value.input);
          if (inputId == null) {
            inputId = inputsNextIndex;
            inputs.set(value.input, inputsNextIndex);
            inputsNextIndex++;
          }
          fixed[name] = {
            end: value.end,
            inputId,
            start: value.start
          };
        } else {
          fixed[name] = value;
        }
      }
      if (emitInputs) {
        fixed.inputs = [...inputs.keys()].map((input3) => input3.toJSON());
      }
      return fixed;
    }
    toProxy() {
      if (!this.proxyCache) {
        this.proxyCache = new Proxy(this, this.getProxyProcessor());
      }
      return this.proxyCache;
    }
    toString(stringifier2 = stringify3) {
      if (stringifier2.stringify) stringifier2 = stringifier2.stringify;
      let result2 = "";
      stringifier2(this, (i) => {
        result2 += i;
      });
      return result2;
    }
    warn(result2, text, opts) {
      let data = {
        node: this
      };
      for (let i in opts) data[i] = opts[i];
      return result2.warn(text, data);
    }
    get proxyOf() {
      return this;
    }
  }
  node = Node2;
  Node2.default = Node2;
  return node;
}
var comment;
var hasRequiredComment;
function requireComment() {
  if (hasRequiredComment) return comment;
  hasRequiredComment = 1;
  let Node2 = requireNode$1();
  class Comment2 extends Node2 {
    constructor(defaults) {
      super(defaults);
      this.type = "comment";
    }
  }
  comment = Comment2;
  Comment2.default = Comment2;
  return comment;
}
var declaration;
var hasRequiredDeclaration;
function requireDeclaration() {
  if (hasRequiredDeclaration) return declaration;
  hasRequiredDeclaration = 1;
  let Node2 = requireNode$1();
  class Declaration extends Node2 {
    constructor(defaults) {
      if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
        defaults = __spreadProps(__spreadValues({}, defaults), {
          value: String(defaults.value)
        });
      }
      super(defaults);
      this.type = "decl";
    }
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
  }
  declaration = Declaration;
  Declaration.default = Declaration;
  return declaration;
}
var container;
var hasRequiredContainer$1;
function requireContainer$1() {
  if (hasRequiredContainer$1) return container;
  hasRequiredContainer$1 = 1;
  let Comment2 = requireComment();
  let Declaration = requireDeclaration();
  let Node2 = requireNode$1();
  let {
    isClean,
    my
  } = requireSymbols();
  let AtRule, parse2, Root2, Rule;
  function cleanSource(nodes) {
    return nodes.map((i) => {
      if (i.nodes) i.nodes = cleanSource(i.nodes);
      delete i.source;
      return i;
    });
  }
  function markTreeDirty(node2) {
    node2[isClean] = false;
    if (node2.proxyOf.nodes) {
      for (let i of node2.proxyOf.nodes) {
        markTreeDirty(i);
      }
    }
  }
  class Container2 extends Node2 {
    append(...children) {
      for (let child of children) {
        let nodes = this.normalize(child, this.last);
        for (let node2 of nodes) this.proxyOf.nodes.push(node2);
      }
      this.markDirty();
      return this;
    }
    cleanRaws(keepBetween) {
      super.cleanRaws(keepBetween);
      if (this.nodes) {
        for (let node2 of this.nodes) node2.cleanRaws(keepBetween);
      }
    }
    each(callback) {
      if (!this.proxyOf.nodes) return void 0;
      let iterator = this.getIterator();
      let index, result2;
      while (this.indexes[iterator] < this.proxyOf.nodes.length) {
        index = this.indexes[iterator];
        result2 = callback(this.proxyOf.nodes[index], index);
        if (result2 === false) break;
        this.indexes[iterator] += 1;
      }
      delete this.indexes[iterator];
      return result2;
    }
    every(condition) {
      return this.nodes.every(condition);
    }
    getIterator() {
      if (!this.lastEach) this.lastEach = 0;
      if (!this.indexes) this.indexes = {};
      this.lastEach += 1;
      let iterator = this.lastEach;
      this.indexes[iterator] = 0;
      return iterator;
    }
    getProxyProcessor() {
      return {
        get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (!node2[prop]) {
            return node2[prop];
          } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
            return (...args) => {
              return node2[prop](...args.map((i) => {
                if (typeof i === "function") {
                  return (child, index) => i(child.toProxy(), index);
                } else {
                  return i;
                }
              }));
            };
          } else if (prop === "every" || prop === "some") {
            return (cb) => {
              return node2[prop]((child, ...other) => cb(child.toProxy(), ...other));
            };
          } else if (prop === "root") {
            return () => node2.root().toProxy();
          } else if (prop === "nodes") {
            return node2.nodes.map((i) => i.toProxy());
          } else if (prop === "first" || prop === "last") {
            return node2[prop].toProxy();
          } else {
            return node2[prop];
          }
        },
        set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "name" || prop === "params" || prop === "selector") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
    index(child) {
      if (typeof child === "number") return child;
      if (child.proxyOf) child = child.proxyOf;
      return this.proxyOf.nodes.indexOf(child);
    }
    insertAfter(exist, add) {
      let existIndex = this.index(exist);
      let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
      existIndex = this.index(exist);
      for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
      let index;
      for (let id in this.indexes) {
        index = this.indexes[id];
        if (existIndex < index) {
          this.indexes[id] = index + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
    insertBefore(exist, add) {
      let existIndex = this.index(exist);
      let type = existIndex === 0 ? "prepend" : false;
      let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
      existIndex = this.index(exist);
      for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex, 0, node2);
      let index;
      for (let id in this.indexes) {
        index = this.indexes[id];
        if (existIndex <= index) {
          this.indexes[id] = index + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
    normalize(nodes, sample) {
      if (typeof nodes === "string") {
        nodes = cleanSource(parse2(nodes).nodes);
      } else if (typeof nodes === "undefined") {
        nodes = [];
      } else if (Array.isArray(nodes)) {
        nodes = nodes.slice(0);
        for (let i of nodes) {
          if (i.parent) i.parent.removeChild(i, "ignore");
        }
      } else if (nodes.type === "root" && this.type !== "document") {
        nodes = nodes.nodes.slice(0);
        for (let i of nodes) {
          if (i.parent) i.parent.removeChild(i, "ignore");
        }
      } else if (nodes.type) {
        nodes = [nodes];
      } else if (nodes.prop) {
        if (typeof nodes.value === "undefined") {
          throw new Error("Value field is missed in node creation");
        } else if (typeof nodes.value !== "string") {
          nodes.value = String(nodes.value);
        }
        nodes = [new Declaration(nodes)];
      } else if (nodes.selector || nodes.selectors) {
        nodes = [new Rule(nodes)];
      } else if (nodes.name) {
        nodes = [new AtRule(nodes)];
      } else if (nodes.text) {
        nodes = [new Comment2(nodes)];
      } else {
        throw new Error("Unknown node type in node creation");
      }
      let processed = nodes.map((i) => {
        if (!i[my]) Container2.rebuild(i);
        i = i.proxyOf;
        if (i.parent) i.parent.removeChild(i);
        if (i[isClean]) markTreeDirty(i);
        if (!i.raws) i.raws = {};
        if (typeof i.raws.before === "undefined") {
          if (sample && typeof sample.raws.before !== "undefined") {
            i.raws.before = sample.raws.before.replace(/\S/g, "");
          }
        }
        i.parent = this.proxyOf;
        return i;
      });
      return processed;
    }
    prepend(...children) {
      children = children.reverse();
      for (let child of children) {
        let nodes = this.normalize(child, this.first, "prepend").reverse();
        for (let node2 of nodes) this.proxyOf.nodes.unshift(node2);
        for (let id in this.indexes) {
          this.indexes[id] = this.indexes[id] + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
    push(child) {
      child.parent = this;
      this.proxyOf.nodes.push(child);
      return this;
    }
    removeAll() {
      for (let node2 of this.proxyOf.nodes) node2.parent = void 0;
      this.proxyOf.nodes = [];
      this.markDirty();
      return this;
    }
    removeChild(child) {
      child = this.index(child);
      this.proxyOf.nodes[child].parent = void 0;
      this.proxyOf.nodes.splice(child, 1);
      let index;
      for (let id in this.indexes) {
        index = this.indexes[id];
        if (index >= child) {
          this.indexes[id] = index - 1;
        }
      }
      this.markDirty();
      return this;
    }
    replaceValues(pattern, opts, callback) {
      if (!callback) {
        callback = opts;
        opts = {};
      }
      this.walkDecls((decl) => {
        if (opts.props && !opts.props.includes(decl.prop)) return;
        if (opts.fast && !decl.value.includes(opts.fast)) return;
        decl.value = decl.value.replace(pattern, callback);
      });
      this.markDirty();
      return this;
    }
    some(condition) {
      return this.nodes.some(condition);
    }
    walk(callback) {
      return this.each((child, i) => {
        let result2;
        try {
          result2 = callback(child, i);
        } catch (e) {
          throw child.addToError(e);
        }
        if (result2 !== false && child.walk) {
          result2 = child.walk(callback);
        }
        return result2;
      });
    }
    walkAtRules(name, callback) {
      if (!callback) {
        callback = name;
        return this.walk((child, i) => {
          if (child.type === "atrule") {
            return callback(child, i);
          }
        });
      }
      if (name instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === "atrule" && name.test(child.name)) {
            return callback(child, i);
          }
        });
      }
      return this.walk((child, i) => {
        if (child.type === "atrule" && child.name === name) {
          return callback(child, i);
        }
      });
    }
    walkComments(callback) {
      return this.walk((child, i) => {
        if (child.type === "comment") {
          return callback(child, i);
        }
      });
    }
    walkDecls(prop, callback) {
      if (!callback) {
        callback = prop;
        return this.walk((child, i) => {
          if (child.type === "decl") {
            return callback(child, i);
          }
        });
      }
      if (prop instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === "decl" && prop.test(child.prop)) {
            return callback(child, i);
          }
        });
      }
      return this.walk((child, i) => {
        if (child.type === "decl" && child.prop === prop) {
          return callback(child, i);
        }
      });
    }
    walkRules(selector, callback) {
      if (!callback) {
        callback = selector;
        return this.walk((child, i) => {
          if (child.type === "rule") {
            return callback(child, i);
          }
        });
      }
      if (selector instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === "rule" && selector.test(child.selector)) {
            return callback(child, i);
          }
        });
      }
      return this.walk((child, i) => {
        if (child.type === "rule" && child.selector === selector) {
          return callback(child, i);
        }
      });
    }
    get first() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[0];
    }
    get last() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
  }
  Container2.registerParse = (dependant) => {
    parse2 = dependant;
  };
  Container2.registerRule = (dependant) => {
    Rule = dependant;
  };
  Container2.registerAtRule = (dependant) => {
    AtRule = dependant;
  };
  Container2.registerRoot = (dependant) => {
    Root2 = dependant;
  };
  container = Container2;
  Container2.default = Container2;
  Container2.rebuild = (node2) => {
    if (node2.type === "atrule") {
      Object.setPrototypeOf(node2, AtRule.prototype);
    } else if (node2.type === "rule") {
      Object.setPrototypeOf(node2, Rule.prototype);
    } else if (node2.type === "decl") {
      Object.setPrototypeOf(node2, Declaration.prototype);
    } else if (node2.type === "comment") {
      Object.setPrototypeOf(node2, Comment2.prototype);
    } else if (node2.type === "root") {
      Object.setPrototypeOf(node2, Root2.prototype);
    }
    node2[my] = true;
    if (node2.nodes) {
      node2.nodes.forEach((child) => {
        Container2.rebuild(child);
      });
    }
  };
  return container;
}
var atRule;
var hasRequiredAtRule;
function requireAtRule() {
  if (hasRequiredAtRule) return atRule;
  hasRequiredAtRule = 1;
  let Container2 = requireContainer$1();
  class AtRule extends Container2 {
    constructor(defaults) {
      super(defaults);
      this.type = "atrule";
    }
    append(...children) {
      if (!this.proxyOf.nodes) this.nodes = [];
      return super.append(...children);
    }
    prepend(...children) {
      if (!this.proxyOf.nodes) this.nodes = [];
      return super.prepend(...children);
    }
  }
  atRule = AtRule;
  AtRule.default = AtRule;
  Container2.registerAtRule(AtRule);
  return atRule;
}
var document;
var hasRequiredDocument;
function requireDocument() {
  if (hasRequiredDocument) return document;
  hasRequiredDocument = 1;
  let Container2 = requireContainer$1();
  let LazyResult, Processor;
  class Document2 extends Container2 {
    constructor(defaults) {
      super(__spreadValues({
        type: "document"
      }, defaults));
      if (!this.nodes) {
        this.nodes = [];
      }
    }
    toResult(opts = {}) {
      let lazy = new LazyResult(new Processor(), this, opts);
      return lazy.stringify();
    }
  }
  Document2.registerLazyResult = (dependant) => {
    LazyResult = dependant;
  };
  Document2.registerProcessor = (dependant) => {
    Processor = dependant;
  };
  document = Document2;
  Document2.default = Document2;
  return document;
}
var nonSecure;
var hasRequiredNonSecure;
function requireNonSecure() {
  if (hasRequiredNonSecure) return nonSecure;
  hasRequiredNonSecure = 1;
  let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  let customAlphabet = (alphabet, defaultSize = 21) => {
    return (size = defaultSize) => {
      let id = "";
      let i = size | 0;
      while (i--) {
        id += alphabet[Math.random() * alphabet.length | 0];
      }
      return id;
    };
  };
  let nanoid = (size = 21) => {
    let id = "";
    let i = size | 0;
    while (i--) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
  nonSecure = {
    nanoid,
    customAlphabet
  };
  return nonSecure;
}
var previousMap;
var hasRequiredPreviousMap;
function requirePreviousMap() {
  if (hasRequiredPreviousMap) return previousMap;
  hasRequiredPreviousMap = 1;
  let {
    existsSync,
    readFileSync
  } = require$$2;
  let {
    dirname: dirname2,
    join: join2
  } = require$$2;
  let {
    SourceMapConsumer,
    SourceMapGenerator
  } = require$$2;
  function fromBase64(str) {
    if (Buffer) {
      return Buffer.from(str, "base64").toString();
    } else {
      return window.atob(str);
    }
  }
  class PreviousMap {
    constructor(css, opts) {
      if (opts.map === false) return;
      this.loadAnnotation(css);
      this.inline = this.startWith(this.annotation, "data:");
      let prev = opts.map ? opts.map.prev : void 0;
      let text = this.loadMap(opts.from, prev);
      if (!this.mapFile && opts.from) {
        this.mapFile = opts.from;
      }
      if (this.mapFile) this.root = dirname2(this.mapFile);
      if (text) this.text = text;
    }
    consumer() {
      if (!this.consumerCache) {
        this.consumerCache = new SourceMapConsumer(this.text);
      }
      return this.consumerCache;
    }
    decodeInline(text) {
      let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
      let baseUri = /^data:application\/json;base64,/;
      let charsetUri = /^data:application\/json;charset=utf-?8,/;
      let uri = /^data:application\/json,/;
      let uriMatch = text.match(charsetUri) || text.match(uri);
      if (uriMatch) {
        return decodeURIComponent(text.substr(uriMatch[0].length));
      }
      let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
      if (baseUriMatch) {
        return fromBase64(text.substr(baseUriMatch[0].length));
      }
      let encoding = text.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + encoding);
    }
    getAnnotationURL(sourceMapString) {
      return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(map2) {
      if (typeof map2 !== "object") return false;
      return typeof map2.mappings === "string" || typeof map2._mappings === "string" || Array.isArray(map2.sections);
    }
    loadAnnotation(css) {
      let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
      if (!comments) return;
      let start = css.lastIndexOf(comments.pop());
      let end = css.indexOf("*/", start);
      if (start > -1 && end > -1) {
        this.annotation = this.getAnnotationURL(css.substring(start, end));
      }
    }
    loadFile(path2) {
      this.root = dirname2(path2);
      if (existsSync(path2)) {
        this.mapFile = path2;
        return readFileSync(path2, "utf-8").toString().trim();
      }
    }
    loadMap(file, prev) {
      if (prev === false) return false;
      if (prev) {
        if (typeof prev === "string") {
          return prev;
        } else if (typeof prev === "function") {
          let prevPath = prev(file);
          if (prevPath) {
            let map2 = this.loadFile(prevPath);
            if (!map2) {
              throw new Error("Unable to load previous source map: " + prevPath.toString());
            }
            return map2;
          }
        } else if (prev instanceof SourceMapConsumer) {
          return SourceMapGenerator.fromSourceMap(prev).toString();
        } else if (prev instanceof SourceMapGenerator) {
          return prev.toString();
        } else if (this.isMap(prev)) {
          return JSON.stringify(prev);
        } else {
          throw new Error("Unsupported previous source map format: " + prev.toString());
        }
      } else if (this.inline) {
        return this.decodeInline(this.annotation);
      } else if (this.annotation) {
        let map2 = this.annotation;
        if (file) map2 = join2(dirname2(file), map2);
        return this.loadFile(map2);
      }
    }
    startWith(string, start) {
      if (!string) return false;
      return string.substr(0, start.length) === start;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  previousMap = PreviousMap;
  PreviousMap.default = PreviousMap;
  return previousMap;
}
var input2;
var hasRequiredInput;
function requireInput() {
  if (hasRequiredInput) return input2;
  hasRequiredInput = 1;
  let {
    nanoid
  } = requireNonSecure();
  let {
    isAbsolute: isAbsolute2,
    resolve: resolve2
  } = require$$2;
  let {
    SourceMapConsumer,
    SourceMapGenerator
  } = require$$2;
  let {
    fileURLToPath,
    pathToFileURL
  } = require$$2;
  let CssSyntaxError = requireCssSyntaxError();
  let PreviousMap = requirePreviousMap();
  let terminalHighlight = require$$2;
  let fromOffsetCache = Symbol("fromOffsetCache");
  let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
  let pathAvailable = Boolean(resolve2 && isAbsolute2);
  class Input2 {
    constructor(css, opts = {}) {
      if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
        throw new Error(`PostCSS received ${css} instead of CSS string`);
      }
      this.css = css.toString();
      if (this.css[0] === "\uFEFF" || this.css[0] === "￾") {
        this.hasBOM = true;
        this.css = this.css.slice(1);
      } else {
        this.hasBOM = false;
      }
      this.document = this.css;
      if (opts.document) this.document = opts.document.toString();
      if (opts.from) {
        if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute2(opts.from)) {
          this.file = opts.from;
        } else {
          this.file = resolve2(opts.from);
        }
      }
      if (pathAvailable && sourceMapAvailable) {
        let map2 = new PreviousMap(this.css, opts);
        if (map2.text) {
          this.map = map2;
          let file = map2.consumer().file;
          if (!this.file && file) this.file = this.mapResolve(file);
        }
      }
      if (!this.file) {
        this.id = "<input css " + nanoid(6) + ">";
      }
      if (this.map) this.map.file = this.from;
    }
    error(message, line, column, opts = {}) {
      let endColumn, endLine, result2;
      if (line && typeof line === "object") {
        let start = line;
        let end = column;
        if (typeof start.offset === "number") {
          let pos = this.fromOffset(start.offset);
          line = pos.line;
          column = pos.col;
        } else {
          line = start.line;
          column = start.column;
        }
        if (typeof end.offset === "number") {
          let pos = this.fromOffset(end.offset);
          endLine = pos.line;
          endColumn = pos.col;
        } else {
          endLine = end.line;
          endColumn = end.column;
        }
      } else if (!column) {
        let pos = this.fromOffset(line);
        line = pos.line;
        column = pos.col;
      }
      let origin = this.origin(line, column, endLine, endColumn);
      if (origin) {
        result2 = new CssSyntaxError(message, origin.endLine === void 0 ? origin.line : {
          column: origin.column,
          line: origin.line
        }, origin.endLine === void 0 ? origin.column : {
          column: origin.endColumn,
          line: origin.endLine
        }, origin.source, origin.file, opts.plugin);
      } else {
        result2 = new CssSyntaxError(message, endLine === void 0 ? line : {
          column,
          line
        }, endLine === void 0 ? column : {
          column: endColumn,
          line: endLine
        }, this.css, this.file, opts.plugin);
      }
      result2.input = {
        column,
        endColumn,
        endLine,
        line,
        source: this.css
      };
      if (this.file) {
        if (pathToFileURL) {
          result2.input.url = pathToFileURL(this.file).toString();
        }
        result2.input.file = this.file;
      }
      return result2;
    }
    fromOffset(offset) {
      let lastLine, lineToIndex;
      if (!this[fromOffsetCache]) {
        let lines = this.css.split("\n");
        lineToIndex = new Array(lines.length);
        let prevIndex = 0;
        for (let i = 0, l = lines.length; i < l; i++) {
          lineToIndex[i] = prevIndex;
          prevIndex += lines[i].length + 1;
        }
        this[fromOffsetCache] = lineToIndex;
      } else {
        lineToIndex = this[fromOffsetCache];
      }
      lastLine = lineToIndex[lineToIndex.length - 1];
      let min = 0;
      if (offset >= lastLine) {
        min = lineToIndex.length - 1;
      } else {
        let max = lineToIndex.length - 2;
        let mid;
        while (min < max) {
          mid = min + (max - min >> 1);
          if (offset < lineToIndex[mid]) {
            max = mid - 1;
          } else if (offset >= lineToIndex[mid + 1]) {
            min = mid + 1;
          } else {
            min = mid;
            break;
          }
        }
      }
      return {
        col: offset - lineToIndex[min] + 1,
        line: min + 1
      };
    }
    mapResolve(file) {
      if (/^\w+:\/\//.test(file)) {
        return file;
      }
      return resolve2(this.map.consumer().sourceRoot || this.map.root || ".", file);
    }
    origin(line, column, endLine, endColumn) {
      if (!this.map) return false;
      let consumer = this.map.consumer();
      let from3 = consumer.originalPositionFor({
        column,
        line
      });
      if (!from3.source) return false;
      let to;
      if (typeof endLine === "number") {
        to = consumer.originalPositionFor({
          column: endColumn,
          line: endLine
        });
      }
      let fromUrl;
      if (isAbsolute2(from3.source)) {
        fromUrl = pathToFileURL(from3.source);
      } else {
        fromUrl = new URL(from3.source, this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile));
      }
      let result2 = {
        column: from3.column,
        endColumn: to && to.column,
        endLine: to && to.line,
        line: from3.line,
        url: fromUrl.toString()
      };
      if (fromUrl.protocol === "file:") {
        if (fileURLToPath) {
          result2.file = fileURLToPath(fromUrl);
        } else {
          throw new Error(`file: protocol is not available in this PostCSS build`);
        }
      }
      let source = consumer.sourceContentFor(from3.source);
      if (source) result2.source = source;
      return result2;
    }
    toJSON() {
      let json = {};
      for (let name of ["hasBOM", "css", "file", "id"]) {
        if (this[name] != null) {
          json[name] = this[name];
        }
      }
      if (this.map) {
        json.map = __spreadValues({}, this.map);
        if (json.map.consumerCache) {
          json.map.consumerCache = void 0;
        }
      }
      return json;
    }
    get from() {
      return this.file || this.id;
    }
  }
  input2 = Input2;
  Input2.default = Input2;
  if (terminalHighlight && terminalHighlight.registerInput) {
    terminalHighlight.registerInput(Input2);
  }
  return input2;
}
var root;
var hasRequiredRoot;
function requireRoot() {
  if (hasRequiredRoot) return root;
  hasRequiredRoot = 1;
  let Container2 = requireContainer$1();
  let LazyResult, Processor;
  class Root2 extends Container2 {
    constructor(defaults) {
      super(defaults);
      this.type = "root";
      if (!this.nodes) this.nodes = [];
    }
    normalize(child, sample, type) {
      let nodes = super.normalize(child);
      if (sample) {
        if (type === "prepend") {
          if (this.nodes.length > 1) {
            sample.raws.before = this.nodes[1].raws.before;
          } else {
            delete sample.raws.before;
          }
        } else if (this.first !== sample) {
          for (let node2 of nodes) {
            node2.raws.before = sample.raws.before;
          }
        }
      }
      return nodes;
    }
    removeChild(child, ignore) {
      let index = this.index(child);
      if (!ignore && index === 0 && this.nodes.length > 1) {
        this.nodes[1].raws.before = this.nodes[index].raws.before;
      }
      return super.removeChild(child);
    }
    toResult(opts = {}) {
      let lazy = new LazyResult(new Processor(), this, opts);
      return lazy.stringify();
    }
  }
  Root2.registerLazyResult = (dependant) => {
    LazyResult = dependant;
  };
  Root2.registerProcessor = (dependant) => {
    Processor = dependant;
  };
  root = Root2;
  Root2.default = Root2;
  Container2.registerRoot(Root2);
  return root;
}
var list_1;
var hasRequiredList;
function requireList() {
  if (hasRequiredList) return list_1;
  hasRequiredList = 1;
  let list = {
    comma(string) {
      return list.split(string, [","], true);
    },
    space(string) {
      let spaces = [" ", "\n", "	"];
      return list.split(string, spaces);
    },
    split(string, separators, last2) {
      let array = [];
      let current = "";
      let split2 = false;
      let func = 0;
      let inQuote = false;
      let prevQuote = "";
      let escape = false;
      for (let letter of string) {
        if (escape) {
          escape = false;
        } else if (letter === "\\") {
          escape = true;
        } else if (inQuote) {
          if (letter === prevQuote) {
            inQuote = false;
          }
        } else if (letter === '"' || letter === "'") {
          inQuote = true;
          prevQuote = letter;
        } else if (letter === "(") {
          func += 1;
        } else if (letter === ")") {
          if (func > 0) func -= 1;
        } else if (func === 0) {
          if (separators.includes(letter)) split2 = true;
        }
        if (split2) {
          if (current !== "") array.push(current.trim());
          current = "";
          split2 = false;
        } else {
          current += letter;
        }
      }
      if (last2 || current !== "") array.push(current.trim());
      return array;
    }
  };
  list_1 = list;
  list.default = list;
  return list_1;
}
var rule;
var hasRequiredRule;
function requireRule() {
  if (hasRequiredRule) return rule;
  hasRequiredRule = 1;
  let Container2 = requireContainer$1();
  let list = requireList();
  class Rule extends Container2 {
    constructor(defaults) {
      super(defaults);
      this.type = "rule";
      if (!this.nodes) this.nodes = [];
    }
    get selectors() {
      return list.comma(this.selector);
    }
    set selectors(values) {
      let match2 = this.selector ? this.selector.match(/,\s*/) : null;
      let sep2 = match2 ? match2[0] : "," + this.raw("between", "beforeOpen");
      this.selector = values.join(sep2);
    }
  }
  rule = Rule;
  Rule.default = Rule;
  Container2.registerRule(Rule);
  return rule;
}
var fromJSON_1;
var hasRequiredFromJSON;
function requireFromJSON() {
  if (hasRequiredFromJSON) return fromJSON_1;
  hasRequiredFromJSON = 1;
  let AtRule = requireAtRule();
  let Comment2 = requireComment();
  let Declaration = requireDeclaration();
  let Input2 = requireInput();
  let PreviousMap = requirePreviousMap();
  let Root2 = requireRoot();
  let Rule = requireRule();
  function fromJSON(json, inputs) {
    if (Array.isArray(json)) return json.map((n) => fromJSON(n));
    let _a2 = json, {
      inputs: ownInputs
    } = _a2, defaults = __objRest(_a2, [
      "inputs"
    ]);
    if (ownInputs) {
      inputs = [];
      for (let input3 of ownInputs) {
        let inputHydrated = __spreadProps(__spreadValues({}, input3), {
          __proto__: Input2.prototype
        });
        if (inputHydrated.map) {
          inputHydrated.map = __spreadProps(__spreadValues({}, inputHydrated.map), {
            __proto__: PreviousMap.prototype
          });
        }
        inputs.push(inputHydrated);
      }
    }
    if (defaults.nodes) {
      defaults.nodes = json.nodes.map((n) => fromJSON(n, inputs));
    }
    if (defaults.source) {
      let _b = defaults.source, {
        inputId
      } = _b, source = __objRest(_b, [
        "inputId"
      ]);
      defaults.source = source;
      if (inputId != null) {
        defaults.source.input = inputs[inputId];
      }
    }
    if (defaults.type === "root") {
      return new Root2(defaults);
    } else if (defaults.type === "decl") {
      return new Declaration(defaults);
    } else if (defaults.type === "rule") {
      return new Rule(defaults);
    } else if (defaults.type === "comment") {
      return new Comment2(defaults);
    } else if (defaults.type === "atrule") {
      return new AtRule(defaults);
    } else {
      throw new Error("Unknown node type: " + json.type);
    }
  }
  fromJSON_1 = fromJSON;
  fromJSON.default = fromJSON;
  return fromJSON_1;
}
var mapGenerator;
var hasRequiredMapGenerator;
function requireMapGenerator() {
  if (hasRequiredMapGenerator) return mapGenerator;
  hasRequiredMapGenerator = 1;
  let {
    dirname: dirname2,
    relative: relative2,
    resolve: resolve2,
    sep: sep2
  } = require$$2;
  let {
    SourceMapConsumer,
    SourceMapGenerator
  } = require$$2;
  let {
    pathToFileURL
  } = require$$2;
  let Input2 = requireInput();
  let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
  let pathAvailable = Boolean(dirname2 && resolve2 && relative2 && sep2);
  class MapGenerator {
    constructor(stringify3, root2, opts, cssString) {
      this.stringify = stringify3;
      this.mapOpts = opts.map || {};
      this.root = root2;
      this.opts = opts;
      this.css = cssString;
      this.originalCSS = cssString;
      this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
      this.memoizedFileURLs = /* @__PURE__ */ new Map();
      this.memoizedPaths = /* @__PURE__ */ new Map();
      this.memoizedURLs = /* @__PURE__ */ new Map();
    }
    addAnnotation() {
      let content;
      if (this.isInline()) {
        content = "data:application/json;base64," + this.toBase64(this.map.toString());
      } else if (typeof this.mapOpts.annotation === "string") {
        content = this.mapOpts.annotation;
      } else if (typeof this.mapOpts.annotation === "function") {
        content = this.mapOpts.annotation(this.opts.to, this.root);
      } else {
        content = this.outputFile() + ".map";
      }
      let eol = "\n";
      if (this.css.includes("\r\n")) eol = "\r\n";
      this.css += eol + "/*# sourceMappingURL=" + content + " */";
    }
    applyPrevMaps() {
      for (let prev of this.previous()) {
        let from3 = this.toUrl(this.path(prev.file));
        let root2 = prev.root || dirname2(prev.file);
        let map2;
        if (this.mapOpts.sourcesContent === false) {
          map2 = new SourceMapConsumer(prev.text);
          if (map2.sourcesContent) {
            map2.sourcesContent = null;
          }
        } else {
          map2 = prev.consumer();
        }
        this.map.applySourceMap(map2, from3, this.toUrl(this.path(root2)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation === false) return;
      if (this.root) {
        let node2;
        for (let i = this.root.nodes.length - 1; i >= 0; i--) {
          node2 = this.root.nodes[i];
          if (node2.type !== "comment") continue;
          if (node2.text.startsWith("# sourceMappingURL=")) {
            this.root.removeChild(i);
          }
        }
      } else if (this.css) {
        this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, "");
      }
    }
    generate() {
      this.clearAnnotation();
      if (pathAvailable && sourceMapAvailable && this.isMap()) {
        return this.generateMap();
      } else {
        let result2 = "";
        this.stringify(this.root, (i) => {
          result2 += i;
        });
        return [result2];
      }
    }
    generateMap() {
      if (this.root) {
        this.generateString();
      } else if (this.previous().length === 1) {
        let prev = this.previous()[0].consumer();
        prev.file = this.outputFile();
        this.map = SourceMapGenerator.fromSourceMap(prev, {
          ignoreInvalidMapping: true
        });
      } else {
        this.map = new SourceMapGenerator({
          file: this.outputFile(),
          ignoreInvalidMapping: true
        });
        this.map.addMapping({
          generated: {
            column: 0,
            line: 1
          },
          original: {
            column: 0,
            line: 1
          },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      }
      if (this.isSourcesContent()) this.setSourcesContent();
      if (this.root && this.previous().length > 0) this.applyPrevMaps();
      if (this.isAnnotation()) this.addAnnotation();
      if (this.isInline()) {
        return [this.css];
      } else {
        return [this.css, this.map];
      }
    }
    generateString() {
      this.css = "";
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });
      let line = 1;
      let column = 1;
      let noSource = "<no source>";
      let mapping = {
        generated: {
          column: 0,
          line: 0
        },
        original: {
          column: 0,
          line: 0
        },
        source: ""
      };
      let last2, lines;
      this.stringify(this.root, (str, node2, type) => {
        this.css += str;
        if (node2 && type !== "end") {
          mapping.generated.line = line;
          mapping.generated.column = column - 1;
          if (node2.source && node2.source.start) {
            mapping.source = this.sourcePath(node2);
            mapping.original.line = node2.source.start.line;
            mapping.original.column = node2.source.start.column - 1;
            this.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            this.map.addMapping(mapping);
          }
        }
        lines = str.match(/\n/g);
        if (lines) {
          line += lines.length;
          last2 = str.lastIndexOf("\n");
          column = str.length - last2;
        } else {
          column += str.length;
        }
        if (node2 && type !== "start") {
          let p = node2.parent || {
            raws: {}
          };
          let childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
          if (!childless || node2 !== p.last || p.raws.semicolon) {
            if (node2.source && node2.source.end) {
              mapping.source = this.sourcePath(node2);
              mapping.original.line = node2.source.end.line;
              mapping.original.column = node2.source.end.column - 1;
              mapping.generated.line = line;
              mapping.generated.column = column - 2;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              mapping.generated.line = line;
              mapping.generated.column = column - 1;
              this.map.addMapping(mapping);
            }
          }
        }
      });
    }
    isAnnotation() {
      if (this.isInline()) {
        return true;
      }
      if (typeof this.mapOpts.annotation !== "undefined") {
        return this.mapOpts.annotation;
      }
      if (this.previous().length) {
        return this.previous().some((i) => i.annotation);
      }
      return true;
    }
    isInline() {
      if (typeof this.mapOpts.inline !== "undefined") {
        return this.mapOpts.inline;
      }
      let annotation = this.mapOpts.annotation;
      if (typeof annotation !== "undefined" && annotation !== true) {
        return false;
      }
      if (this.previous().length) {
        return this.previous().some((i) => i.inline);
      }
      return true;
    }
    isMap() {
      if (typeof this.opts.map !== "undefined") {
        return !!this.opts.map;
      }
      return this.previous().length > 0;
    }
    isSourcesContent() {
      if (typeof this.mapOpts.sourcesContent !== "undefined") {
        return this.mapOpts.sourcesContent;
      }
      if (this.previous().length) {
        return this.previous().some((i) => i.withContent());
      }
      return true;
    }
    outputFile() {
      if (this.opts.to) {
        return this.path(this.opts.to);
      } else if (this.opts.from) {
        return this.path(this.opts.from);
      } else {
        return "to.css";
      }
    }
    path(file) {
      if (this.mapOpts.absolute) return file;
      if (file.charCodeAt(0) === 60) return file;
      if (/^\w+:\/\//.test(file)) return file;
      let cached = this.memoizedPaths.get(file);
      if (cached) return cached;
      let from3 = this.opts.to ? dirname2(this.opts.to) : ".";
      if (typeof this.mapOpts.annotation === "string") {
        from3 = dirname2(resolve2(from3, this.mapOpts.annotation));
      }
      let path2 = relative2(from3, file);
      this.memoizedPaths.set(file, path2);
      return path2;
    }
    previous() {
      if (!this.previousMaps) {
        this.previousMaps = [];
        if (this.root) {
          this.root.walk((node2) => {
            if (node2.source && node2.source.input.map) {
              let map2 = node2.source.input.map;
              if (!this.previousMaps.includes(map2)) {
                this.previousMaps.push(map2);
              }
            }
          });
        } else {
          let input3 = new Input2(this.originalCSS, this.opts);
          if (input3.map) this.previousMaps.push(input3.map);
        }
      }
      return this.previousMaps;
    }
    setSourcesContent() {
      let already = {};
      if (this.root) {
        this.root.walk((node2) => {
          if (node2.source) {
            let from3 = node2.source.input.from;
            if (from3 && !already[from3]) {
              already[from3] = true;
              let fromUrl = this.usesFileUrls ? this.toFileUrl(from3) : this.toUrl(this.path(from3));
              this.map.setSourceContent(fromUrl, node2.source.input.css);
            }
          }
        });
      } else if (this.css) {
        let from3 = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(from3, this.css);
      }
    }
    sourcePath(node2) {
      if (this.mapOpts.from) {
        return this.toUrl(this.mapOpts.from);
      } else if (this.usesFileUrls) {
        return this.toFileUrl(node2.source.input.from);
      } else {
        return this.toUrl(this.path(node2.source.input.from));
      }
    }
    toBase64(str) {
      if (Buffer) {
        return Buffer.from(str).toString("base64");
      } else {
        return window.btoa(unescape(encodeURIComponent(str)));
      }
    }
    toFileUrl(path2) {
      let cached = this.memoizedFileURLs.get(path2);
      if (cached) return cached;
      if (pathToFileURL) {
        let fileURL = pathToFileURL(path2).toString();
        this.memoizedFileURLs.set(path2, fileURL);
        return fileURL;
      } else {
        throw new Error("`map.absolute` option is not available in this PostCSS build");
      }
    }
    toUrl(path2) {
      let cached = this.memoizedURLs.get(path2);
      if (cached) return cached;
      if (sep2 === "\\") {
        path2 = path2.replace(/\\/g, "/");
      }
      let url = encodeURI(path2).replace(/[#?]/g, encodeURIComponent);
      this.memoizedURLs.set(path2, url);
      return url;
    }
  }
  mapGenerator = MapGenerator;
  return mapGenerator;
}
var tokenize;
var hasRequiredTokenize;
function requireTokenize() {
  if (hasRequiredTokenize) return tokenize;
  hasRequiredTokenize = 1;
  const SINGLE_QUOTE = "'".charCodeAt(0);
  const DOUBLE_QUOTE = '"'.charCodeAt(0);
  const BACKSLASH = "\\".charCodeAt(0);
  const SLASH = "/".charCodeAt(0);
  const NEWLINE = "\n".charCodeAt(0);
  const SPACE = " ".charCodeAt(0);
  const FEED = "\f".charCodeAt(0);
  const TAB = "	".charCodeAt(0);
  const CR = "\r".charCodeAt(0);
  const OPEN_SQUARE = "[".charCodeAt(0);
  const CLOSE_SQUARE = "]".charCodeAt(0);
  const OPEN_PARENTHESES = "(".charCodeAt(0);
  const CLOSE_PARENTHESES = ")".charCodeAt(0);
  const OPEN_CURLY = "{".charCodeAt(0);
  const CLOSE_CURLY = "}".charCodeAt(0);
  const SEMICOLON = ";".charCodeAt(0);
  const ASTERISK = "*".charCodeAt(0);
  const COLON = ":".charCodeAt(0);
  const AT = "@".charCodeAt(0);
  const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
  const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
  const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
  const RE_HEX_ESCAPE = /[\da-f]/i;
  tokenize = function tokenizer(input3, options = {}) {
    let css = input3.css.valueOf();
    let ignore = options.ignoreErrors;
    let code, content, escape, next, quote;
    let currentToken, escaped, escapePos, n, prev;
    let length = css.length;
    let pos = 0;
    let buffer = [];
    let returned = [];
    function position() {
      return pos;
    }
    function unclosed(what) {
      throw input3.error("Unclosed " + what, pos);
    }
    function endOfFile() {
      return returned.length === 0 && pos >= length;
    }
    function nextToken(opts) {
      if (returned.length) return returned.pop();
      if (pos >= length) return;
      let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
      code = css.charCodeAt(pos);
      switch (code) {
        case NEWLINE:
        case SPACE:
        case TAB:
        case CR:
        case FEED: {
          next = pos;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
          currentToken = ["space", css.slice(pos, next)];
          pos = next - 1;
          break;
        }
        case OPEN_SQUARE:
        case CLOSE_SQUARE:
        case OPEN_CURLY:
        case CLOSE_CURLY:
        case COLON:
        case SEMICOLON:
        case CLOSE_PARENTHESES: {
          let controlChar = String.fromCharCode(code);
          currentToken = [controlChar, controlChar, pos];
          break;
        }
        case OPEN_PARENTHESES: {
          prev = buffer.length ? buffer.pop()[1] : "";
          n = css.charCodeAt(pos + 1);
          if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(")", next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos;
                  break;
                } else {
                  unclosed("bracket");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            next = css.indexOf(")", pos + 1);
            content = css.slice(pos, next + 1);
            if (next === -1 || RE_BAD_BRACKET.test(content)) {
              currentToken = ["(", "(", pos];
            } else {
              currentToken = ["brackets", content, pos, next];
              pos = next;
            }
          }
          break;
        }
        case SINGLE_QUOTE:
        case DOUBLE_QUOTE: {
          quote = code === SINGLE_QUOTE ? "'" : '"';
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(quote, next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos + 1;
                break;
              } else {
                unclosed("string");
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          currentToken = ["string", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
        case AT: {
          RE_AT_END.lastIndex = pos + 1;
          RE_AT_END.test(css);
          if (RE_AT_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_AT_END.lastIndex - 2;
          }
          currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
        case BACKSLASH: {
          next = pos;
          escape = true;
          while (css.charCodeAt(next + 1) === BACKSLASH) {
            next += 1;
            escape = !escape;
          }
          code = css.charCodeAt(next + 1);
          if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
            next += 1;
            if (RE_HEX_ESCAPE.test(css.charAt(next))) {
              while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                next += 1;
              }
              if (css.charCodeAt(next + 1) === SPACE) {
                next += 1;
              }
            }
          }
          currentToken = ["word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
        default: {
          if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
            next = css.indexOf("*/", pos + 2) + 1;
            if (next === 0) {
              if (ignore || ignoreUnclosed) {
                next = css.length;
              } else {
                unclosed("comment");
              }
            }
            currentToken = ["comment", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            RE_WORD_END.lastIndex = pos + 1;
            RE_WORD_END.test(css);
            if (RE_WORD_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_WORD_END.lastIndex - 2;
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            buffer.push(currentToken);
            pos = next;
          }
          break;
        }
      }
      pos++;
      return currentToken;
    }
    function back(token) {
      returned.push(token);
    }
    return {
      back,
      endOfFile,
      nextToken,
      position
    };
  };
  return tokenize;
}
var parser;
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  let AtRule = requireAtRule();
  let Comment2 = requireComment();
  let Declaration = requireDeclaration();
  let Root2 = requireRoot();
  let Rule = requireRule();
  let tokenizer = requireTokenize();
  const SAFE_COMMENT_NEIGHBOR = {
    empty: true,
    space: true
  };
  function findLastWithPosition(tokens) {
    for (let i = tokens.length - 1; i >= 0; i--) {
      let token = tokens[i];
      let pos = token[3] || token[2];
      if (pos) return pos;
    }
  }
  class Parser2 {
    constructor(input3) {
      this.input = input3;
      this.root = new Root2();
      this.current = this.root;
      this.spaces = "";
      this.semicolon = false;
      this.createTokenizer();
      this.root.source = {
        input: input3,
        start: {
          column: 1,
          line: 1,
          offset: 0
        }
      };
    }
    atrule(token) {
      let node2 = new AtRule();
      node2.name = token[1].slice(1);
      if (node2.name === "") {
        this.unnamedAtrule(node2, token);
      }
      this.init(node2, token[2]);
      let type;
      let prev;
      let shift;
      let last2 = false;
      let open2 = false;
      let params = [];
      let brackets = [];
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        type = token[0];
        if (type === "(" || type === "[") {
          brackets.push(type === "(" ? ")" : "]");
        } else if (type === "{" && brackets.length > 0) {
          brackets.push("}");
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
        }
        if (brackets.length === 0) {
          if (type === ";") {
            node2.source.end = this.getPosition(token[2]);
            node2.source.end.offset++;
            this.semicolon = true;
            break;
          } else if (type === "{") {
            open2 = true;
            break;
          } else if (type === "}") {
            if (params.length > 0) {
              shift = params.length - 1;
              prev = params[shift];
              while (prev && prev[0] === "space") {
                prev = params[--shift];
              }
              if (prev) {
                node2.source.end = this.getPosition(prev[3] || prev[2]);
                node2.source.end.offset++;
              }
            }
            this.end(token);
            break;
          } else {
            params.push(token);
          }
        } else {
          params.push(token);
        }
        if (this.tokenizer.endOfFile()) {
          last2 = true;
          break;
        }
      }
      node2.raws.between = this.spacesAndCommentsFromEnd(params);
      if (params.length) {
        node2.raws.afterName = this.spacesAndCommentsFromStart(params);
        this.raw(node2, "params", params);
        if (last2) {
          token = params[params.length - 1];
          node2.source.end = this.getPosition(token[3] || token[2]);
          node2.source.end.offset++;
          this.spaces = node2.raws.between;
          node2.raws.between = "";
        }
      } else {
        node2.raws.afterName = "";
        node2.params = "";
      }
      if (open2) {
        node2.nodes = [];
        this.current = node2;
      }
    }
    checkMissedSemicolon(tokens) {
      let colon = this.colon(tokens);
      if (colon === false) return;
      let founded = 0;
      let token;
      for (let j = colon - 1; j >= 0; j--) {
        token = tokens[j];
        if (token[0] !== "space") {
          founded += 1;
          if (founded === 2) break;
        }
      }
      throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
    }
    colon(tokens) {
      let brackets = 0;
      let prev, token, type;
      for (let [i, element] of tokens.entries()) {
        token = element;
        type = token[0];
        if (type === "(") {
          brackets += 1;
        }
        if (type === ")") {
          brackets -= 1;
        }
        if (brackets === 0 && type === ":") {
          if (!prev) {
            this.doubleColon(token);
          } else if (prev[0] === "word" && prev[1] === "progid") {
            continue;
          } else {
            return i;
          }
        }
        prev = token;
      }
      return false;
    }
    comment(token) {
      let node2 = new Comment2();
      this.init(node2, token[2]);
      node2.source.end = this.getPosition(token[3] || token[2]);
      node2.source.end.offset++;
      let text = token[1].slice(2, -2);
      if (/^\s*$/.test(text)) {
        node2.text = "";
        node2.raws.left = text;
        node2.raws.right = "";
      } else {
        let match2 = text.match(/^(\s*)([^]*\S)(\s*)$/);
        node2.text = match2[2];
        node2.raws.left = match2[1];
        node2.raws.right = match2[3];
      }
    }
    createTokenizer() {
      this.tokenizer = tokenizer(this.input);
    }
    decl(tokens, customProperty) {
      let node2 = new Declaration();
      this.init(node2, tokens[0][2]);
      let last2 = tokens[tokens.length - 1];
      if (last2[0] === ";") {
        this.semicolon = true;
        tokens.pop();
      }
      node2.source.end = this.getPosition(last2[3] || last2[2] || findLastWithPosition(tokens));
      node2.source.end.offset++;
      while (tokens[0][0] !== "word") {
        if (tokens.length === 1) this.unknownWord(tokens);
        node2.raws.before += tokens.shift()[1];
      }
      node2.source.start = this.getPosition(tokens[0][2]);
      node2.prop = "";
      while (tokens.length) {
        let type = tokens[0][0];
        if (type === ":" || type === "space" || type === "comment") {
          break;
        }
        node2.prop += tokens.shift()[1];
      }
      node2.raws.between = "";
      let token;
      while (tokens.length) {
        token = tokens.shift();
        if (token[0] === ":") {
          node2.raws.between += token[1];
          break;
        } else {
          if (token[0] === "word" && /\w/.test(token[1])) {
            this.unknownWord([token]);
          }
          node2.raws.between += token[1];
        }
      }
      if (node2.prop[0] === "_" || node2.prop[0] === "*") {
        node2.raws.before += node2.prop[0];
        node2.prop = node2.prop.slice(1);
      }
      let firstSpaces = [];
      let next;
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        firstSpaces.push(tokens.shift());
      }
      this.precheckMissedSemicolon(tokens);
      for (let i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];
        if (token[1].toLowerCase() === "!important") {
          node2.important = true;
          let string = this.stringFrom(tokens, i);
          string = this.spacesFromEnd(tokens) + string;
          if (string !== " !important") node2.raws.important = string;
          break;
        } else if (token[1].toLowerCase() === "important") {
          let cache = tokens.slice(0);
          let str = "";
          for (let j = i; j > 0; j--) {
            let type = cache[j][0];
            if (str.trim().startsWith("!") && type !== "space") {
              break;
            }
            str = cache.pop()[1] + str;
          }
          if (str.trim().startsWith("!")) {
            node2.important = true;
            node2.raws.important = str;
            tokens = cache;
          }
        }
        if (token[0] !== "space" && token[0] !== "comment") {
          break;
        }
      }
      let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
      if (hasWord) {
        node2.raws.between += firstSpaces.map((i) => i[1]).join("");
        firstSpaces = [];
      }
      this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
      if (node2.value.includes(":") && !customProperty) {
        this.checkMissedSemicolon(tokens);
      }
    }
    doubleColon(token) {
      throw this.input.error("Double colon", {
        offset: token[2]
      }, {
        offset: token[2] + token[1].length
      });
    }
    emptyRule(token) {
      let node2 = new Rule();
      this.init(node2, token[2]);
      node2.selector = "";
      node2.raws.between = "";
      this.current = node2;
    }
    end(token) {
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.semicolon = false;
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.spaces = "";
      if (this.current.parent) {
        this.current.source.end = this.getPosition(token[2]);
        this.current.source.end.offset++;
        this.current = this.current.parent;
      } else {
        this.unexpectedClose(token);
      }
    }
    endFile() {
      if (this.current.parent) this.unclosedBlock();
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.root.source.end = this.getPosition(this.tokenizer.position());
    }
    freeSemicolon(token) {
      this.spaces += token[1];
      if (this.current.nodes) {
        let prev = this.current.nodes[this.current.nodes.length - 1];
        if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
          prev.raws.ownSemicolon = this.spaces;
          this.spaces = "";
          prev.source.end = this.getPosition(token[2]);
          prev.source.end.offset += prev.raws.ownSemicolon.length;
        }
      }
    }
    // Helpers
    getPosition(offset) {
      let pos = this.input.fromOffset(offset);
      return {
        column: pos.col,
        line: pos.line,
        offset
      };
    }
    init(node2, offset) {
      this.current.push(node2);
      node2.source = {
        input: this.input,
        start: this.getPosition(offset)
      };
      node2.raws.before = this.spaces;
      this.spaces = "";
      if (node2.type !== "comment") this.semicolon = false;
    }
    other(start) {
      let end = false;
      let type = null;
      let colon = false;
      let bracket = null;
      let brackets = [];
      let customProperty = start[1].startsWith("--");
      let tokens = [];
      let token = start;
      while (token) {
        type = token[0];
        tokens.push(token);
        if (type === "(" || type === "[") {
          if (!bracket) bracket = token;
          brackets.push(type === "(" ? ")" : "]");
        } else if (customProperty && colon && type === "{") {
          if (!bracket) bracket = token;
          brackets.push("}");
        } else if (brackets.length === 0) {
          if (type === ";") {
            if (colon) {
              this.decl(tokens, customProperty);
              return;
            } else {
              break;
            }
          } else if (type === "{") {
            this.rule(tokens);
            return;
          } else if (type === "}") {
            this.tokenizer.back(tokens.pop());
            end = true;
            break;
          } else if (type === ":") {
            colon = true;
          }
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
          if (brackets.length === 0) bracket = null;
        }
        token = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile()) end = true;
      if (brackets.length > 0) this.unclosedBracket(bracket);
      if (end && colon) {
        if (!customProperty) {
          while (tokens.length) {
            token = tokens[tokens.length - 1][0];
            if (token !== "space" && token !== "comment") break;
            this.tokenizer.back(tokens.pop());
          }
        }
        this.decl(tokens, customProperty);
      } else {
        this.unknownWord(tokens);
      }
    }
    parse() {
      let token;
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        switch (token[0]) {
          case "space":
            this.spaces += token[1];
            break;
          case ";":
            this.freeSemicolon(token);
            break;
          case "}":
            this.end(token);
            break;
          case "comment":
            this.comment(token);
            break;
          case "at-word":
            this.atrule(token);
            break;
          case "{":
            this.emptyRule(token);
            break;
          default:
            this.other(token);
            break;
        }
      }
      this.endFile();
    }
    precheckMissedSemicolon() {
    }
    raw(node2, prop, tokens, customProperty) {
      let token, type;
      let length = tokens.length;
      let value = "";
      let clean = true;
      let next, prev;
      for (let i = 0; i < length; i += 1) {
        token = tokens[i];
        type = token[0];
        if (type === "space" && i === length - 1 && !customProperty) {
          clean = false;
        } else if (type === "comment") {
          prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
          next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
          if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
            if (value.slice(-1) === ",") {
              clean = false;
            } else {
              value += token[1];
            }
          } else {
            clean = false;
          }
        } else {
          value += token[1];
        }
      }
      if (!clean) {
        let raw = tokens.reduce((all, i) => all + i[1], "");
        node2.raws[prop] = {
          raw,
          value
        };
      }
      node2[prop] = value;
    }
    rule(tokens) {
      tokens.pop();
      let node2 = new Rule();
      this.init(node2, tokens[0][2]);
      node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
      this.raw(node2, "selector", tokens);
      this.current = node2;
    }
    spacesAndCommentsFromEnd(tokens) {
      let lastTokenType;
      let spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space" && lastTokenType !== "comment") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
    // Errors
    spacesAndCommentsFromStart(tokens) {
      let next;
      let spaces = "";
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        spaces += tokens.shift()[1];
      }
      return spaces;
    }
    spacesFromEnd(tokens) {
      let lastTokenType;
      let spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
    stringFrom(tokens, from3) {
      let result2 = "";
      for (let i = from3; i < tokens.length; i++) {
        result2 += tokens[i][1];
      }
      tokens.splice(from3, tokens.length - from3);
      return result2;
    }
    unclosedBlock() {
      let pos = this.current.source.start;
      throw this.input.error("Unclosed block", pos.line, pos.column);
    }
    unclosedBracket(bracket) {
      throw this.input.error("Unclosed bracket", {
        offset: bracket[2]
      }, {
        offset: bracket[2] + 1
      });
    }
    unexpectedClose(token) {
      throw this.input.error("Unexpected }", {
        offset: token[2]
      }, {
        offset: token[2] + 1
      });
    }
    unknownWord(tokens) {
      throw this.input.error("Unknown word", {
        offset: tokens[0][2]
      }, {
        offset: tokens[0][2] + tokens[0][1].length
      });
    }
    unnamedAtrule(node2, token) {
      throw this.input.error("At-rule without name", {
        offset: token[2]
      }, {
        offset: token[2] + token[1].length
      });
    }
  }
  parser = Parser2;
  return parser;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  let Container2 = requireContainer$1();
  let Input2 = requireInput();
  let Parser2 = requireParser();
  function parse2(css, opts) {
    let input3 = new Input2(css, opts);
    let parser2 = new Parser2(input3);
    try {
      parser2.parse();
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        if (e.name === "CssSyntaxError" && opts && opts.from) {
          if (/\.scss$/i.test(opts.from)) {
            e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
          } else if (/\.sass/i.test(opts.from)) {
            e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
          } else if (/\.less$/i.test(opts.from)) {
            e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
          }
        }
      }
      throw e;
    }
    return parser2.root;
  }
  parse_1 = parse2;
  parse2.default = parse2;
  Container2.registerParse(parse2);
  return parse_1;
}
var warning;
var hasRequiredWarning;
function requireWarning() {
  if (hasRequiredWarning) return warning;
  hasRequiredWarning = 1;
  class Warning {
    constructor(text, opts = {}) {
      this.type = "warning";
      this.text = text;
      if (opts.node && opts.node.source) {
        let range = opts.node.rangeBy(opts);
        this.line = range.start.line;
        this.column = range.start.column;
        this.endLine = range.end.line;
        this.endColumn = range.end.column;
      }
      for (let opt in opts) this[opt] = opts[opt];
    }
    toString() {
      if (this.node) {
        return this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word
        }).message;
      }
      if (this.plugin) {
        return this.plugin + ": " + this.text;
      }
      return this.text;
    }
  }
  warning = Warning;
  Warning.default = Warning;
  return warning;
}
var result;
var hasRequiredResult;
function requireResult() {
  if (hasRequiredResult) return result;
  hasRequiredResult = 1;
  let Warning = requireWarning();
  class Result {
    constructor(processor2, root2, opts) {
      this.processor = processor2;
      this.messages = [];
      this.root = root2;
      this.opts = opts;
      this.css = void 0;
      this.map = void 0;
    }
    toString() {
      return this.css;
    }
    warn(text, opts = {}) {
      if (!opts.plugin) {
        if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
          opts.plugin = this.lastPlugin.postcssPlugin;
        }
      }
      let warning2 = new Warning(text, opts);
      this.messages.push(warning2);
      return warning2;
    }
    warnings() {
      return this.messages.filter((i) => i.type === "warning");
    }
    get content() {
      return this.css;
    }
  }
  result = Result;
  Result.default = Result;
  return result;
}
var warnOnce;
var hasRequiredWarnOnce;
function requireWarnOnce() {
  if (hasRequiredWarnOnce) return warnOnce;
  hasRequiredWarnOnce = 1;
  let printed = {};
  warnOnce = function warnOnce2(message) {
    if (printed[message]) return;
    printed[message] = true;
    if (typeof console !== "undefined" && console.warn) {
      console.warn(message);
    }
  };
  return warnOnce;
}
var lazyResult;
var hasRequiredLazyResult;
function requireLazyResult() {
  if (hasRequiredLazyResult) return lazyResult;
  hasRequiredLazyResult = 1;
  let Container2 = requireContainer$1();
  let Document2 = requireDocument();
  let MapGenerator = requireMapGenerator();
  let parse2 = requireParse();
  let Result = requireResult();
  let Root2 = requireRoot();
  let stringify3 = requireStringify();
  let {
    isClean,
    my
  } = requireSymbols();
  let warnOnce2 = requireWarnOnce();
  const TYPE_TO_CLASS_NAME = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule"
  };
  const PLUGIN_PROPS = {
    AtRule: true,
    AtRuleExit: true,
    Comment: true,
    CommentExit: true,
    Declaration: true,
    DeclarationExit: true,
    Document: true,
    DocumentExit: true,
    Once: true,
    OnceExit: true,
    postcssPlugin: true,
    prepare: true,
    Root: true,
    RootExit: true,
    Rule: true,
    RuleExit: true
  };
  const NOT_VISITORS = {
    Once: true,
    postcssPlugin: true,
    prepare: true
  };
  const CHILDREN = 0;
  function isPromise2(obj) {
    return typeof obj === "object" && typeof obj.then === "function";
  }
  function getEvents(node2) {
    let key = false;
    let type = TYPE_TO_CLASS_NAME[node2.type];
    if (node2.type === "decl") {
      key = node2.prop.toLowerCase();
    } else if (node2.type === "atrule") {
      key = node2.name.toLowerCase();
    }
    if (key && node2.append) {
      return [type, type + "-" + key, CHILDREN, type + "Exit", type + "Exit-" + key];
    } else if (key) {
      return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
    } else if (node2.append) {
      return [type, CHILDREN, type + "Exit"];
    } else {
      return [type, type + "Exit"];
    }
  }
  function toStack(node2) {
    let events;
    if (node2.type === "document") {
      events = ["Document", CHILDREN, "DocumentExit"];
    } else if (node2.type === "root") {
      events = ["Root", CHILDREN, "RootExit"];
    } else {
      events = getEvents(node2);
    }
    return {
      eventIndex: 0,
      events,
      iterator: 0,
      node: node2,
      visitorIndex: 0,
      visitors: []
    };
  }
  function cleanMarks(node2) {
    node2[isClean] = false;
    if (node2.nodes) node2.nodes.forEach((i) => cleanMarks(i));
    return node2;
  }
  let postcss2 = {};
  class LazyResult {
    constructor(processor2, css, opts) {
      this.stringified = false;
      this.processed = false;
      let root2;
      if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
        root2 = cleanMarks(css);
      } else if (css instanceof LazyResult || css instanceof Result) {
        root2 = cleanMarks(css.root);
        if (css.map) {
          if (typeof opts.map === "undefined") opts.map = {};
          if (!opts.map.inline) opts.map.inline = false;
          opts.map.prev = css.map;
        }
      } else {
        let parser2 = parse2;
        if (opts.syntax) parser2 = opts.syntax.parse;
        if (opts.parser) parser2 = opts.parser;
        if (parser2.parse) parser2 = parser2.parse;
        try {
          root2 = parser2(css, opts);
        } catch (error) {
          this.processed = true;
          this.error = error;
        }
        if (root2 && !root2[my]) {
          Container2.rebuild(root2);
        }
      }
      this.result = new Result(processor2, root2, opts);
      this.helpers = __spreadProps(__spreadValues({}, postcss2), {
        postcss: postcss2,
        result: this.result
      });
      this.plugins = this.processor.plugins.map((plugin) => {
        if (typeof plugin === "object" && plugin.prepare) {
          return __spreadValues(__spreadValues({}, plugin), plugin.prepare(this.result));
        } else {
          return plugin;
        }
      });
    }
    async() {
      if (this.error) return Promise.reject(this.error);
      if (this.processed) return Promise.resolve(this.result);
      if (!this.processing) {
        this.processing = this.runAsync();
      }
      return this.processing;
    }
    catch(onRejected) {
      return this.async().catch(onRejected);
    }
    finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(error, node2) {
      let plugin = this.result.lastPlugin;
      try {
        if (node2) node2.addToError(error);
        this.error = error;
        if (error.name === "CssSyntaxError" && !error.plugin) {
          error.plugin = plugin.postcssPlugin;
          error.setMessage();
        } else if (plugin.postcssVersion) {
          if (process.env.NODE_ENV !== "production") {
            let pluginName = plugin.postcssPlugin;
            let pluginVer = plugin.postcssVersion;
            let runtimeVer = this.result.processor.version;
            let a = pluginVer.split(".");
            let b = runtimeVer.split(".");
            if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
              console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below.");
            }
          }
        }
      } catch (err) {
        if (console && console.error) console.error(err);
      }
      return error;
    }
    prepareVisitors() {
      this.listeners = {};
      let add = (plugin, type, cb) => {
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push([plugin, cb]);
      };
      for (let plugin of this.plugins) {
        if (typeof plugin === "object") {
          for (let event in plugin) {
            if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
              throw new Error(`Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
            }
            if (!NOT_VISITORS[event]) {
              if (typeof plugin[event] === "object") {
                for (let filter4 in plugin[event]) {
                  if (filter4 === "*") {
                    add(plugin, event, plugin[event][filter4]);
                  } else {
                    add(plugin, event + "-" + filter4.toLowerCase(), plugin[event][filter4]);
                  }
                }
              } else if (typeof plugin[event] === "function") {
                add(plugin, event, plugin[event]);
              }
            }
          }
        }
      }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    runAsync() {
      return __async(this, null, function* () {
        this.plugin = 0;
        for (let i = 0; i < this.plugins.length; i++) {
          let plugin = this.plugins[i];
          let promise = this.runOnRoot(plugin);
          if (isPromise2(promise)) {
            try {
              yield promise;
            } catch (error) {
              throw this.handleError(error);
            }
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root2 = this.result.root;
          while (!root2[isClean]) {
            root2[isClean] = true;
            let stack = [toStack(root2)];
            while (stack.length > 0) {
              let promise = this.visitTick(stack);
              if (isPromise2(promise)) {
                try {
                  yield promise;
                } catch (e) {
                  let node2 = stack[stack.length - 1].node;
                  throw this.handleError(e, node2);
                }
              }
            }
          }
          if (this.listeners.OnceExit) {
            for (let [plugin, visitor] of this.listeners.OnceExit) {
              this.result.lastPlugin = plugin;
              try {
                if (root2.type === "document") {
                  let roots = root2.nodes.map((subRoot) => visitor(subRoot, this.helpers));
                  yield Promise.all(roots);
                } else {
                  yield visitor(root2, this.helpers);
                }
              } catch (e) {
                throw this.handleError(e);
              }
            }
          }
        }
        this.processed = true;
        return this.stringify();
      });
    }
    runOnRoot(plugin) {
      this.result.lastPlugin = plugin;
      try {
        if (typeof plugin === "object" && plugin.Once) {
          if (this.result.root.type === "document") {
            let roots = this.result.root.nodes.map((root2) => plugin.Once(root2, this.helpers));
            if (isPromise2(roots[0])) {
              return Promise.all(roots);
            }
            return roots;
          }
          return plugin.Once(this.result.root, this.helpers);
        } else if (typeof plugin === "function") {
          return plugin(this.result.root, this.result);
        }
      } catch (error) {
        throw this.handleError(error);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = true;
      this.sync();
      let opts = this.result.opts;
      let str = stringify3;
      if (opts.syntax) str = opts.syntax.stringify;
      if (opts.stringifier) str = opts.stringifier;
      if (str.stringify) str = str.stringify;
      let map2 = new MapGenerator(str, this.result.root, this.result.opts);
      let data = map2.generate();
      this.result.css = data[0];
      this.result.map = data[1];
      return this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      this.processed = true;
      if (this.processing) {
        throw this.getAsyncError();
      }
      for (let plugin of this.plugins) {
        let promise = this.runOnRoot(plugin);
        if (isPromise2(promise)) {
          throw this.getAsyncError();
        }
      }
      this.prepareVisitors();
      if (this.hasListener) {
        let root2 = this.result.root;
        while (!root2[isClean]) {
          root2[isClean] = true;
          this.walkSync(root2);
        }
        if (this.listeners.OnceExit) {
          if (root2.type === "document") {
            for (let subRoot of root2.nodes) {
              this.visitSync(this.listeners.OnceExit, subRoot);
            }
          } else {
            this.visitSync(this.listeners.OnceExit, root2);
          }
        }
      }
      return this.result;
    }
    then(onFulfilled, onRejected) {
      if (process.env.NODE_ENV !== "production") {
        if (!("from" in this.opts)) {
          warnOnce2("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
        }
      }
      return this.async().then(onFulfilled, onRejected);
    }
    toString() {
      return this.css;
    }
    visitSync(visitors, node2) {
      for (let [plugin, visitor] of visitors) {
        this.result.lastPlugin = plugin;
        let promise;
        try {
          promise = visitor(node2, this.helpers);
        } catch (e) {
          throw this.handleError(e, node2.proxyOf);
        }
        if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
          return true;
        }
        if (isPromise2(promise)) {
          throw this.getAsyncError();
        }
      }
    }
    visitTick(stack) {
      let visit = stack[stack.length - 1];
      let {
        node: node2,
        visitors
      } = visit;
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        stack.pop();
        return;
      }
      if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
        let [plugin, visitor] = visitors[visit.visitorIndex];
        visit.visitorIndex += 1;
        if (visit.visitorIndex === visitors.length) {
          visit.visitors = [];
          visit.visitorIndex = 0;
        }
        this.result.lastPlugin = plugin;
        try {
          return visitor(node2.toProxy(), this.helpers);
        } catch (e) {
          throw this.handleError(e, node2);
        }
      }
      if (visit.iterator !== 0) {
        let iterator = visit.iterator;
        let child;
        while (child = node2.nodes[node2.indexes[iterator]]) {
          node2.indexes[iterator] += 1;
          if (!child[isClean]) {
            child[isClean] = true;
            stack.push(toStack(child));
            return;
          }
        }
        visit.iterator = 0;
        delete node2.indexes[iterator];
      }
      let events = visit.events;
      while (visit.eventIndex < events.length) {
        let event = events[visit.eventIndex];
        visit.eventIndex += 1;
        if (event === CHILDREN) {
          if (node2.nodes && node2.nodes.length) {
            node2[isClean] = true;
            visit.iterator = node2.getIterator();
          }
          return;
        } else if (this.listeners[event]) {
          visit.visitors = this.listeners[event];
          return;
        }
      }
      stack.pop();
    }
    walkSync(node2) {
      node2[isClean] = true;
      let events = getEvents(node2);
      for (let event of events) {
        if (event === CHILDREN) {
          if (node2.nodes) {
            node2.each((child) => {
              if (!child[isClean]) this.walkSync(child);
            });
          }
        } else {
          let visitors = this.listeners[event];
          if (visitors) {
            if (this.visitSync(visitors, node2.toProxy())) return;
          }
        }
      }
    }
    warnings() {
      return this.sync().warnings();
    }
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
  }
  LazyResult.registerPostcss = (dependant) => {
    postcss2 = dependant;
  };
  lazyResult = LazyResult;
  LazyResult.default = LazyResult;
  Root2.registerLazyResult(LazyResult);
  Document2.registerLazyResult(LazyResult);
  return lazyResult;
}
var noWorkResult;
var hasRequiredNoWorkResult;
function requireNoWorkResult() {
  if (hasRequiredNoWorkResult) return noWorkResult;
  hasRequiredNoWorkResult = 1;
  let MapGenerator = requireMapGenerator();
  let parse2 = requireParse();
  const Result = requireResult();
  let stringify3 = requireStringify();
  let warnOnce2 = requireWarnOnce();
  class NoWorkResult {
    constructor(processor2, css, opts) {
      css = css.toString();
      this.stringified = false;
      this._processor = processor2;
      this._css = css;
      this._opts = opts;
      this._map = void 0;
      let root2;
      let str = stringify3;
      this.result = new Result(this._processor, root2, this._opts);
      this.result.css = css;
      let self = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return self.root;
        }
      });
      let map2 = new MapGenerator(str, root2, this._opts, css);
      if (map2.isMap()) {
        let [generatedCSS, generatedMap] = map2.generate();
        if (generatedCSS) {
          this.result.css = generatedCSS;
        }
        if (generatedMap) {
          this.result.map = generatedMap;
        }
      } else {
        map2.clearAnnotation();
        this.result.css = map2.css;
      }
    }
    async() {
      if (this.error) return Promise.reject(this.error);
      return Promise.resolve(this.result);
    }
    catch(onRejected) {
      return this.async().catch(onRejected);
    }
    finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(onFulfilled, onRejected) {
      if (process.env.NODE_ENV !== "production") {
        if (!("from" in this._opts)) {
          warnOnce2("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
        }
      }
      return this.async().then(onFulfilled, onRejected);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root) {
        return this._root;
      }
      let root2;
      let parser2 = parse2;
      try {
        root2 = parser2(this._css, this._opts);
      } catch (error) {
        this.error = error;
      }
      if (this.error) {
        throw this.error;
      } else {
        this._root = root2;
        return root2;
      }
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
  }
  noWorkResult = NoWorkResult;
  NoWorkResult.default = NoWorkResult;
  return noWorkResult;
}
var processor;
var hasRequiredProcessor;
function requireProcessor() {
  if (hasRequiredProcessor) return processor;
  hasRequiredProcessor = 1;
  let Document2 = requireDocument();
  let LazyResult = requireLazyResult();
  let NoWorkResult = requireNoWorkResult();
  let Root2 = requireRoot();
  class Processor {
    constructor(plugins = []) {
      this.version = "8.5.2";
      this.plugins = this.normalize(plugins);
    }
    normalize(plugins) {
      let normalized = [];
      for (let i of plugins) {
        if (i.postcss === true) {
          i = i();
        } else if (i.postcss) {
          i = i.postcss;
        }
        if (typeof i === "object" && Array.isArray(i.plugins)) {
          normalized = normalized.concat(i.plugins);
        } else if (typeof i === "object" && i.postcssPlugin) {
          normalized.push(i);
        } else if (typeof i === "function") {
          normalized.push(i);
        } else if (typeof i === "object" && (i.parse || i.stringify)) {
          if (process.env.NODE_ENV !== "production") {
            throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
          }
        } else {
          throw new Error(i + " is not a PostCSS plugin");
        }
      }
      return normalized;
    }
    process(css, opts = {}) {
      if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
        return new NoWorkResult(this, css, opts);
      } else {
        return new LazyResult(this, css, opts);
      }
    }
    use(plugin) {
      this.plugins = this.plugins.concat(this.normalize([plugin]));
      return this;
    }
  }
  processor = Processor;
  Processor.default = Processor;
  Root2.registerProcessor(Processor);
  Document2.registerProcessor(Processor);
  return processor;
}
var postcss_1;
var hasRequiredPostcss;
function requirePostcss() {
  if (hasRequiredPostcss) return postcss_1;
  hasRequiredPostcss = 1;
  let AtRule = requireAtRule();
  let Comment2 = requireComment();
  let Container2 = requireContainer$1();
  let CssSyntaxError = requireCssSyntaxError();
  let Declaration = requireDeclaration();
  let Document2 = requireDocument();
  let fromJSON = requireFromJSON();
  let Input2 = requireInput();
  let LazyResult = requireLazyResult();
  let list = requireList();
  let Node2 = requireNode$1();
  let parse2 = requireParse();
  let Processor = requireProcessor();
  let Result = requireResult();
  let Root2 = requireRoot();
  let Rule = requireRule();
  let stringify3 = requireStringify();
  let Warning = requireWarning();
  function postcss2(...plugins) {
    if (plugins.length === 1 && Array.isArray(plugins[0])) {
      plugins = plugins[0];
    }
    return new Processor(plugins);
  }
  postcss2.plugin = function plugin(name, initializer) {
    let warningPrinted = false;
    function creator(...args) {
      if (console && console.warn && !warningPrinted) {
        warningPrinted = true;
        console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration");
        if (process.env.LANG && process.env.LANG.startsWith("cn")) {
          console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226");
        }
      }
      let transformer = initializer(...args);
      transformer.postcssPlugin = name;
      transformer.postcssVersion = new Processor().version;
      return transformer;
    }
    let cache;
    Object.defineProperty(creator, "postcss", {
      get() {
        if (!cache) cache = creator();
        return cache;
      }
    });
    creator.process = function(css, processOpts, pluginOpts) {
      return postcss2([creator(pluginOpts)]).process(css, processOpts);
    };
    return creator;
  };
  postcss2.stringify = stringify3;
  postcss2.parse = parse2;
  postcss2.fromJSON = fromJSON;
  postcss2.list = list;
  postcss2.comment = (defaults) => new Comment2(defaults);
  postcss2.atRule = (defaults) => new AtRule(defaults);
  postcss2.decl = (defaults) => new Declaration(defaults);
  postcss2.rule = (defaults) => new Rule(defaults);
  postcss2.root = (defaults) => new Root2(defaults);
  postcss2.document = (defaults) => new Document2(defaults);
  postcss2.CssSyntaxError = CssSyntaxError;
  postcss2.Declaration = Declaration;
  postcss2.Container = Container2;
  postcss2.Processor = Processor;
  postcss2.Document = Document2;
  postcss2.Comment = Comment2;
  postcss2.Warning = Warning;
  postcss2.AtRule = AtRule;
  postcss2.Result = Result;
  postcss2.Input = Input2;
  postcss2.Rule = Rule;
  postcss2.Root = Root2;
  postcss2.Node = Node2;
  LazyResult.registerPostcss(postcss2);
  postcss_1 = postcss2;
  postcss2.default = postcss2;
  return postcss_1;
}
var postcssExports = requirePostcss();
var postcss = getDefaultExportFromCjs(postcssExports);
var stringify2 = postcss.stringify;
postcss.fromJSON;
postcss.plugin;
var parse$2 = postcss.parse;
postcss.list;
postcss.document;
postcss.comment;
postcss.atRule;
postcss.rule;
postcss.decl;
postcss.root;
postcss.CssSyntaxError;
postcss.Declaration;
postcss.Container;
postcss.Processor;
postcss.Document;
postcss.Comment;
postcss.Warning;
postcss.AtRule;
postcss.Result;
postcss.Input;
postcss.Rule;
postcss.Root;
postcss.Node;
var dist = {};
var Container = {};
var Node$1 = {};
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return Node$1;
  hasRequiredNode = 1;
  Object.defineProperty(Node$1, "__esModule", {
    value: true
  });
  function Node2(opts) {
    this.after = opts.after;
    this.before = opts.before;
    this.type = opts.type;
    this.value = opts.value;
    this.sourceIndex = opts.sourceIndex;
  }
  Node$1.default = Node2;
  return Node$1;
}
var hasRequiredContainer;
function requireContainer() {
  if (hasRequiredContainer) return Container;
  hasRequiredContainer = 1;
  Object.defineProperty(Container, "__esModule", {
    value: true
  });
  var _Node = requireNode();
  var _Node2 = _interopRequireDefault(_Node);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function Container$1(opts) {
    var _this = this;
    this.constructor(opts);
    this.nodes = opts.nodes;
    if (this.after === void 0) {
      this.after = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].after : "";
    }
    if (this.before === void 0) {
      this.before = this.nodes.length > 0 ? this.nodes[0].before : "";
    }
    if (this.sourceIndex === void 0) {
      this.sourceIndex = this.before.length;
    }
    this.nodes.forEach(function(node2) {
      node2.parent = _this;
    });
  }
  Container$1.prototype = Object.create(_Node2.default.prototype);
  Container$1.constructor = _Node2.default;
  Container$1.prototype.walk = function walk(filter4, cb) {
    var hasFilter = typeof filter4 === "string" || filter4 instanceof RegExp;
    var callback = hasFilter ? cb : filter4;
    var filterReg = typeof filter4 === "string" ? new RegExp(filter4) : filter4;
    for (var i = 0; i < this.nodes.length; i++) {
      var node2 = this.nodes[i];
      var filtered = hasFilter ? filterReg.test(node2.type) : true;
      if (filtered && callback && callback(node2, i, this.nodes) === false) {
        return false;
      }
      if (node2.nodes && node2.walk(filter4, cb) === false) {
        return false;
      }
    }
    return true;
  };
  Container$1.prototype.each = function each() {
    var cb = arguments.length <= 0 || arguments[0] === void 0 ? function() {
    } : arguments[0];
    for (var i = 0; i < this.nodes.length; i++) {
      var node2 = this.nodes[i];
      if (cb(node2, i, this.nodes) === false) {
        return false;
      }
    }
    return true;
  };
  Container.default = Container$1;
  return Container;
}
var parsers = {};
var hasRequiredParsers;
function requireParsers() {
  if (hasRequiredParsers) return parsers;
  hasRequiredParsers = 1;
  Object.defineProperty(parsers, "__esModule", {
    value: true
  });
  parsers.parseMediaFeature = parseMediaFeature;
  parsers.parseMediaQuery = parseMediaQuery;
  parsers.parseMediaList = parseMediaList;
  var _Node = requireNode();
  var _Node2 = _interopRequireDefault(_Node);
  var _Container = requireContainer();
  var _Container2 = _interopRequireDefault(_Container);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function parseMediaFeature(string) {
    var index = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
    var modesEntered = [{
      mode: "normal",
      character: null
    }];
    var result2 = [];
    var lastModeIndex = 0;
    var mediaFeature = "";
    var colon = null;
    var mediaFeatureValue = null;
    var indexLocal = index;
    var stringNormalized = string;
    if (string[0] === "(" && string[string.length - 1] === ")") {
      stringNormalized = string.substring(1, string.length - 1);
      indexLocal++;
    }
    for (var i = 0; i < stringNormalized.length; i++) {
      var character = stringNormalized[i];
      if (character === "'" || character === '"') {
        if (modesEntered[lastModeIndex].isCalculationEnabled === true) {
          modesEntered.push({
            mode: "string",
            isCalculationEnabled: false,
            character
          });
          lastModeIndex++;
        } else if (modesEntered[lastModeIndex].mode === "string" && modesEntered[lastModeIndex].character === character && stringNormalized[i - 1] !== "\\") {
          modesEntered.pop();
          lastModeIndex--;
        }
      }
      if (character === "{") {
        modesEntered.push({
          mode: "interpolation",
          isCalculationEnabled: true
        });
        lastModeIndex++;
      } else if (character === "}") {
        modesEntered.pop();
        lastModeIndex--;
      }
      if (modesEntered[lastModeIndex].mode === "normal" && character === ":") {
        var mediaFeatureValueStr = stringNormalized.substring(i + 1);
        mediaFeatureValue = {
          type: "value",
          before: /^(\s*)/.exec(mediaFeatureValueStr)[1],
          after: /(\s*)$/.exec(mediaFeatureValueStr)[1],
          value: mediaFeatureValueStr.trim()
        };
        mediaFeatureValue.sourceIndex = mediaFeatureValue.before.length + i + 1 + indexLocal;
        colon = {
          type: "colon",
          sourceIndex: i + indexLocal,
          after: mediaFeatureValue.before,
          value: ":"
        };
        break;
      }
      mediaFeature += character;
    }
    mediaFeature = {
      type: "media-feature",
      before: /^(\s*)/.exec(mediaFeature)[1],
      after: /(\s*)$/.exec(mediaFeature)[1],
      value: mediaFeature.trim()
    };
    mediaFeature.sourceIndex = mediaFeature.before.length + indexLocal;
    result2.push(mediaFeature);
    if (colon !== null) {
      colon.before = mediaFeature.after;
      result2.push(colon);
    }
    if (mediaFeatureValue !== null) {
      result2.push(mediaFeatureValue);
    }
    return result2;
  }
  function parseMediaQuery(string) {
    var index = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
    var result2 = [];
    var localLevel = 0;
    var insideSomeValue = false;
    var node2 = void 0;
    function resetNode() {
      return {
        before: "",
        after: "",
        value: ""
      };
    }
    node2 = resetNode();
    for (var i = 0; i < string.length; i++) {
      var character = string[i];
      if (!insideSomeValue) {
        if (character.search(/\s/) !== -1) {
          node2.before += character;
        } else {
          if (character === "(") {
            node2.type = "media-feature-expression";
            localLevel++;
          }
          node2.value = character;
          node2.sourceIndex = index + i;
          insideSomeValue = true;
        }
      } else {
        node2.value += character;
        if (character === "{" || character === "(") {
          localLevel++;
        }
        if (character === ")" || character === "}") {
          localLevel--;
        }
      }
      if (insideSomeValue && localLevel === 0 && (character === ")" || i === string.length - 1 || string[i + 1].search(/\s/) !== -1)) {
        if (["not", "only", "and"].indexOf(node2.value) !== -1) {
          node2.type = "keyword";
        }
        if (node2.type === "media-feature-expression") {
          node2.nodes = parseMediaFeature(node2.value, node2.sourceIndex);
        }
        result2.push(Array.isArray(node2.nodes) ? new _Container2.default(node2) : new _Node2.default(node2));
        node2 = resetNode();
        insideSomeValue = false;
      }
    }
    for (var _i = 0; _i < result2.length; _i++) {
      node2 = result2[_i];
      if (_i > 0) {
        result2[_i - 1].after = node2.before;
      }
      if (node2.type === void 0) {
        if (_i > 0) {
          if (result2[_i - 1].type === "media-feature-expression") {
            node2.type = "keyword";
            continue;
          }
          if (result2[_i - 1].value === "not" || result2[_i - 1].value === "only") {
            node2.type = "media-type";
            continue;
          }
          if (result2[_i - 1].value === "and") {
            node2.type = "media-feature-expression";
            continue;
          }
          if (result2[_i - 1].type === "media-type") {
            if (!result2[_i + 1]) {
              node2.type = "media-feature-expression";
            } else {
              node2.type = result2[_i + 1].type === "media-feature-expression" ? "keyword" : "media-feature-expression";
            }
          }
        }
        if (_i === 0) {
          if (!result2[_i + 1]) {
            node2.type = "media-type";
            continue;
          }
          if (result2[_i + 1] && (result2[_i + 1].type === "media-feature-expression" || result2[_i + 1].type === "keyword")) {
            node2.type = "media-type";
            continue;
          }
          if (result2[_i + 2]) {
            if (result2[_i + 2].type === "media-feature-expression") {
              node2.type = "media-type";
              result2[_i + 1].type = "keyword";
              continue;
            }
            if (result2[_i + 2].type === "keyword") {
              node2.type = "keyword";
              result2[_i + 1].type = "media-type";
              continue;
            }
          }
          if (result2[_i + 3]) {
            if (result2[_i + 3].type === "media-feature-expression") {
              node2.type = "keyword";
              result2[_i + 1].type = "media-type";
              result2[_i + 2].type = "keyword";
              continue;
            }
          }
        }
      }
    }
    return result2;
  }
  function parseMediaList(string) {
    var result2 = [];
    var interimIndex = 0;
    var levelLocal = 0;
    var doesHaveUrl = /^(\s*)url\s*\(/.exec(string);
    if (doesHaveUrl !== null) {
      var i = doesHaveUrl[0].length;
      var parenthesesLv = 1;
      while (parenthesesLv > 0) {
        var character = string[i];
        if (character === "(") {
          parenthesesLv++;
        }
        if (character === ")") {
          parenthesesLv--;
        }
        i++;
      }
      result2.unshift(new _Node2.default({
        type: "url",
        value: string.substring(0, i).trim(),
        sourceIndex: doesHaveUrl[1].length,
        before: doesHaveUrl[1],
        after: /^(\s*)/.exec(string.substring(i))[1]
      }));
      interimIndex = i;
    }
    for (var _i2 = interimIndex; _i2 < string.length; _i2++) {
      var _character = string[_i2];
      if (_character === "(") {
        levelLocal++;
      }
      if (_character === ")") {
        levelLocal--;
      }
      if (levelLocal === 0 && _character === ",") {
        var _mediaQueryString = string.substring(interimIndex, _i2);
        var _spaceBefore = /^(\s*)/.exec(_mediaQueryString)[1];
        result2.push(new _Container2.default({
          type: "media-query",
          value: _mediaQueryString.trim(),
          sourceIndex: interimIndex + _spaceBefore.length,
          nodes: parseMediaQuery(_mediaQueryString, interimIndex),
          before: _spaceBefore,
          after: /(\s*)$/.exec(_mediaQueryString)[1]
        }));
        interimIndex = _i2 + 1;
      }
    }
    var mediaQueryString = string.substring(interimIndex);
    var spaceBefore = /^(\s*)/.exec(mediaQueryString)[1];
    result2.push(new _Container2.default({
      type: "media-query",
      value: mediaQueryString.trim(),
      sourceIndex: interimIndex + spaceBefore.length,
      nodes: parseMediaQuery(mediaQueryString, interimIndex),
      before: spaceBefore,
      after: /(\s*)$/.exec(mediaQueryString)[1]
    }));
    return result2;
  }
  return parsers;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  Object.defineProperty(dist, "__esModule", {
    value: true
  });
  dist.default = parseMedia;
  var _Container = requireContainer();
  var _Container2 = _interopRequireDefault(_Container);
  var _parsers = requireParsers();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function parseMedia(value) {
    return new _Container2.default({
      nodes: (0, _parsers.parseMediaList)(value),
      type: "media-query-list",
      value: value.trim()
    });
  }
  return dist;
}
var distExports = requireDist();
var mediaParser = getDefaultExportFromCjs(distExports);
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag$1(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
var Root = ElementType.Root;
var Text$1 = ElementType.Text;
var Directive2 = ElementType.Directive;
var Comment$1 = ElementType.Comment;
var Script = ElementType.Script;
var Style = ElementType.Style;
var Tag = ElementType.Tag;
var CDATA$1 = ElementType.CDATA;
var Doctype = ElementType.Doctype;
var Node = class {
  constructor() {
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.startIndex = null;
    this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent) {
    this.parent = parent;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(prev) {
    this.prev = prev;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next) {
    this.next = next;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive = false) {
    return cloneNode(this, recursive);
  }
};
var DataNode = class extends Node {
  /**
   * @param data The content of the data node
   */
  constructor(data) {
    super();
    this.data = data;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data) {
    this.data = data;
  }
};
var Text = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Text;
  }
  get nodeType() {
    return 3;
  }
};
var Comment = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Comment;
  }
  get nodeType() {
    return 8;
  }
};
var ProcessingInstruction = class extends DataNode {
  constructor(name, data) {
    super(data);
    this.name = name;
    this.type = ElementType.Directive;
  }
  get nodeType() {
    return 1;
  }
};
var NodeWithChildren = class extends Node {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(children) {
    super();
    this.children = children;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var _a2;
    return (_a2 = this.children[0]) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(children) {
    this.children = children;
  }
};
var CDATA = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.CDATA;
  }
  get nodeType() {
    return 4;
  }
};
var Document = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.Root;
  }
  get nodeType() {
    return 9;
  }
};
var Element = class extends NodeWithChildren {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(name, attribs, children = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
    super(children);
    this.name = name;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(name) {
    this.name = name;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name) => {
      var _a2, _b;
      return {
        name,
        value: this.attribs[name],
        namespace: (_a2 = this["x-attribsNamespace"]) === null || _a2 === void 0 ? void 0 : _a2[name],
        prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
      };
    });
  }
};
function isTag(node2) {
  return isTag$1(node2);
}
function isCDATA(node2) {
  return node2.type === ElementType.CDATA;
}
function isText(node2) {
  return node2.type === ElementType.Text;
}
function isComment(node2) {
  return node2.type === ElementType.Comment;
}
function isDirective(node2) {
  return node2.type === ElementType.Directive;
}
function isDocument(node2) {
  return node2.type === ElementType.Root;
}
function hasChildren(node2) {
  return Object.prototype.hasOwnProperty.call(node2, "children");
}
function cloneNode(node2, recursive = false) {
  let result2;
  if (isText(node2)) {
    result2 = new Text(node2.data);
  } else if (isComment(node2)) {
    result2 = new Comment(node2.data);
  } else if (isTag(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Element(node2.name, __spreadValues({}, node2.attribs), children);
    children.forEach((child) => child.parent = clone);
    if (node2.namespace != null) {
      clone.namespace = node2.namespace;
    }
    if (node2["x-attribsNamespace"]) {
      clone["x-attribsNamespace"] = __spreadValues({}, node2["x-attribsNamespace"]);
    }
    if (node2["x-attribsPrefix"]) {
      clone["x-attribsPrefix"] = __spreadValues({}, node2["x-attribsPrefix"]);
    }
    result2 = clone;
  } else if (isCDATA(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new CDATA(children);
    children.forEach((child) => child.parent = clone);
    result2 = clone;
  } else if (isDocument(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Document(children);
    children.forEach((child) => child.parent = clone);
    if (node2["x-mode"]) {
      clone["x-mode"] = node2["x-mode"];
    }
    result2 = clone;
  } else if (isDirective(node2)) {
    const instruction = new ProcessingInstruction(node2.name, node2.data);
    if (node2["x-name"] != null) {
      instruction["x-name"] = node2["x-name"];
      instruction["x-publicId"] = node2["x-publicId"];
      instruction["x-systemId"] = node2["x-systemId"];
    }
    result2 = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node2.type}`);
  }
  result2.startIndex = node2.startIndex;
  result2.endIndex = node2.endIndex;
  if (node2.sourceCodeLocation != null) {
    result2.sourceCodeLocation = node2.sourceCodeLocation;
  }
  return result2;
}
function cloneChildren(childs) {
  const children = childs.map((child) => cloneNode(child, true));
  for (let i = 1; i < children.length; i++) {
    children[i].prev = children[i - 1];
    children[i - 1].next = children[i];
  }
  return children;
}
var defaultOpts = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};
var DomHandler = class {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(callback, options, elementCB) {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
    if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }
    if (typeof callback === "object") {
      options = callback;
      callback = void 0;
    }
    this.callback = callback !== null && callback !== void 0 ? callback : null;
    this.options = options !== null && options !== void 0 ? options : defaultOpts;
    this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
  }
  onparserinit(parser2) {
    this.parser = parser2;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    if (this.done) return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const elem = this.tagStack.pop();
    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }
    if (this.elementCB) this.elementCB(elem);
  }
  onopentag(name, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : void 0;
    const element = new Element(name, attribs, void 0, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data) {
    const {
      lastNode
    } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data;
      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node2 = new Text(data);
      this.addNode(node2);
      this.lastNode = node2;
    }
  }
  oncomment(data) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data;
      return;
    }
    const node2 = new Comment(data);
    this.addNode(node2);
    this.lastNode = node2;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text = new Text("");
    const node2 = new CDATA([text]);
    this.addNode(node2);
    text.parent = node2;
    this.lastNode = text;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name, data) {
    const node2 = new ProcessingInstruction(name, data);
    this.addNode(node2);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node2) {
    const parent = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent.children[parent.children.length - 1];
    if (this.options.withStartIndices) {
      node2.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices) {
      node2.endIndex = this.parser.endIndex;
    }
    parent.children.push(node2);
    if (previousSibling) {
      node2.prev = previousSibling;
      previousSibling.next = node2;
    }
    node2.parent = parent;
    this.lastNode = null;
  }
};
var htmlDecodeTree$1 = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
);
var xmlDecodeTree$1 = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0))
);
var _a$1;
var decodeMap$1 = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint$1 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_a$1 = String.fromCodePoint) !== null && _a$1 !== void 0 ? _a$1 : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint$1(codePoint) {
  var _a2;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a2 = decodeMap$1.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
}
var CharCodes$2;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes$2 || (CharCodes$2 = {}));
var TO_LOWER_BIT$1 = 32;
var BinTrieFlags$1;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags$1 || (BinTrieFlags$1 = {}));
function isNumber$1(code) {
  return code >= CharCodes$2.ZERO && code <= CharCodes$2.NINE;
}
function isHexadecimalCharacter$1(code) {
  return code >= CharCodes$2.UPPER_A && code <= CharCodes$2.UPPER_F || code >= CharCodes$2.LOWER_A && code <= CharCodes$2.LOWER_F;
}
function isAsciiAlphaNumeric$1(code) {
  return code >= CharCodes$2.UPPER_A && code <= CharCodes$2.UPPER_Z || code >= CharCodes$2.LOWER_A && code <= CharCodes$2.LOWER_Z || isNumber$1(code);
}
function isEntityInAttributeInvalidEnd$1(code) {
  return code === CharCodes$2.EQUALS || isAsciiAlphaNumeric$1(code);
}
var EntityDecoderState$1;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState$1 || (EntityDecoderState$1 = {}));
var DecodingMode$1;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode$1 || (DecodingMode$1 = {}));
var EntityDecoder$1 = class EntityDecoder {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState$1.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode$1.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState$1.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState$1.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes$2.NUM) {
          this.state = EntityDecoderState$1.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState$1.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState$1.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState$1.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState$1.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState$1.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT$1) === CharCodes$2.LOWER_X) {
      this.state = EntityDecoderState$1.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState$1.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber$1(char) || isHexadecimalCharacter$1(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber$1(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength) {
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes$2.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode$1.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint$1(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes$2.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(str, offset) {
    const {
      decodeTree
    } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags$1.VALUE_LENGTH) >> 14;
    for (; offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch$1(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode$1.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd$1(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags$1.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes$2.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode$1.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a2;
    const {
      result: result2,
      decodeTree
    } = this;
    const valueLength = (decodeTree[result2] & BinTrieFlags$1.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result2, valueLength, this.consumed);
    (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result2, valueLength, consumed) {
    const {
      decodeTree
    } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result2] & ~BinTrieFlags$1.VALUE_LENGTH : decodeTree[result2 + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result2 + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState$1.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode$1.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState$1.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState$1.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState$1.NumericStart: {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState$1.EntityStart: {
        return 0;
      }
    }
  }
};
function getDecoder(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder$1(decodeTree, (str) => ret += fromCodePoint$1(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder.startEntity(decodeMode);
      const len = decoder.write(
        str,
        // Skip the "&"
        offset + 1
      );
      if (len < 0) {
        lastIndex = offset + decoder.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result2 = ret + str.slice(lastIndex);
    ret = "";
    return result2;
  };
}
function determineBranch$1(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags$1.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags$1.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo = nodeIdx;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo = mid + 1;
    } else if (midVal > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
getDecoder(htmlDecodeTree$1);
getDecoder(xmlDecodeTree$1);
function restoreDiff(arr) {
  for (let i = 1; i < arr.length; i++) {
    arr[i][0] += arr[i - 1][0] + 1;
  }
  return arr;
}
new Map(restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, {
  v: "&lt;",
  n: 8402,
  o: "&nvlt;"
}], [0, {
  v: "&equals;",
  n: 8421,
  o: "&bne;"
}], [0, {
  v: "&gt;",
  n: 8402,
  o: "&nvgt;"
}], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, {
  n: 106,
  o: "&fjlig;"
}], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, {
  v: "&MediumSpace;",
  n: 8202,
  o: "&ThickSpace;"
}], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, {
  v: "&rarrw;",
  n: 824,
  o: "&nrarrw;"
}], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, {
  v: "&part;",
  n: 824,
  o: "&npart;"
}], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, {
  v: "&ang;",
  n: 8402,
  o: "&nang;"
}], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, {
  v: "&cap;",
  n: 65024,
  o: "&caps;"
}], [0, {
  v: "&cup;",
  n: 65024,
  o: "&cups;"
}], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, {
  v: "&sim;",
  n: 8402,
  o: "&nvsim;"
}], [0, {
  v: "&backsim;",
  n: 817,
  o: "&race;"
}], [0, {
  v: "&ac;",
  n: 819,
  o: "&acE;"
}], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, {
  v: "&eqsim;",
  n: 824,
  o: "&nesim;"
}], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, {
  v: "&apid;",
  n: 824,
  o: "&napid;"
}], [0, "&backcong;"], [0, {
  v: "&asympeq;",
  n: 8402,
  o: "&nvap;"
}], [0, {
  v: "&bump;",
  n: 824,
  o: "&nbump;"
}], [0, {
  v: "&bumpe;",
  n: 824,
  o: "&nbumpe;"
}], [0, {
  v: "&doteq;",
  n: 824,
  o: "&nedot;"
}], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, {
  v: "&Congruent;",
  n: 8421,
  o: "&bnequiv;"
}], [0, "&nequiv;"], [1, {
  v: "&le;",
  n: 8402,
  o: "&nvle;"
}], [0, {
  v: "&ge;",
  n: 8402,
  o: "&nvge;"
}], [0, {
  v: "&lE;",
  n: 824,
  o: "&nlE;"
}], [0, {
  v: "&gE;",
  n: 824,
  o: "&ngE;"
}], [0, {
  v: "&lnE;",
  n: 65024,
  o: "&lvertneqq;"
}], [0, {
  v: "&gnE;",
  n: 65024,
  o: "&gvertneqq;"
}], [0, {
  v: "&ll;",
  n: new Map(restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]]))
}], [0, {
  v: "&gg;",
  n: new Map(restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]]))
}], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, {
  v: "&scsim;",
  n: 824,
  o: "&NotSucceedsTilde;"
}], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, {
  v: "&sub;",
  n: 8402,
  o: "&NotSubset;"
}], [0, {
  v: "&sup;",
  n: 8402,
  o: "&NotSuperset;"
}], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, {
  v: "&subne;",
  n: 65024,
  o: "&varsubsetneq;"
}], [0, {
  v: "&supne;",
  n: 65024,
  o: "&varsupsetneq;"
}], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, {
  v: "&sqsub;",
  n: 824,
  o: "&NotSquareSubset;"
}], [0, {
  v: "&sqsup;",
  n: 824,
  o: "&NotSquareSuperset;"
}], [0, "&sqsube;"], [0, "&sqsupe;"], [0, {
  v: "&sqcap;",
  n: 65024,
  o: "&sqcaps;"
}], [0, {
  v: "&sqcup;",
  n: 65024,
  o: "&sqcups;"
}], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, {
  v: "&LeftTriangleEqual;",
  n: 8402,
  o: "&nvltrie;"
}], [0, {
  v: "&RightTriangleEqual;",
  n: 8402,
  o: "&nvrtrie;"
}], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, {
  v: "&Ll;",
  n: 824,
  o: "&nLl;"
}], [0, {
  v: "&Gg;",
  n: 824,
  o: "&nGg;"
}], [0, {
  v: "&leg;",
  n: 65024,
  o: "&lesg;"
}], [0, {
  v: "&gel;",
  n: 65024,
  o: "&gesl;"
}], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, {
  v: "&isindot;",
  n: 824,
  o: "&notindot;"
}], [0, "&notinvc;"], [0, "&notinvb;"], [1, {
  v: "&isinE;",
  n: 824,
  o: "&notinE;"
}], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, {
  v: "&rarrc;",
  n: 824,
  o: "&nrarrc;"
}], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, {
  v: "&LeftTriangleBar;",
  n: 824,
  o: "&NotLeftTriangleBar;"
}], [0, {
  v: "&RightTriangleBar;",
  n: 824,
  o: "&NotRightTriangleBar;"
}], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, {
  v: "&congdot;",
  n: 824,
  o: "&ncongdot;"
}], [0, "&easter;"], [0, "&apacir;"], [0, {
  v: "&apE;",
  n: 824,
  o: "&napE;"
}], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, {
  v: "&leqslant;",
  n: 824,
  o: "&nleqslant;"
}], [0, {
  v: "&geqslant;",
  n: 824,
  o: "&ngeqslant;"
}], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, {
  v: "&LessLess;",
  n: 824,
  o: "&NotNestedLessLess;"
}], [0, {
  v: "&GreaterGreater;",
  n: 824,
  o: "&NotNestedGreaterGreater;"
}], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, {
  v: "&smte;",
  n: 65024,
  o: "&smtes;"
}], [0, {
  v: "&late;",
  n: 65024,
  o: "&lates;"
}], [0, "&bumpE;"], [0, {
  v: "&PrecedesEqual;",
  n: 824,
  o: "&NotPrecedesEqual;"
}], [0, {
  v: "&sce;",
  n: 824,
  o: "&NotSucceedsEqual;"
}], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, {
  v: "&subE;",
  n: 824,
  o: "&nsubE;"
}], [0, {
  v: "&supE;",
  n: 824,
  o: "&nsupE;"
}], [0, "&subsim;"], [0, "&supsim;"], [2, {
  v: "&subnE;",
  n: 65024,
  o: "&varsubsetneqq;"
}], [0, {
  v: "&supnE;",
  n: 65024,
  o: "&varsupsetneqq;"
}], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, {
  v: "&parsl;",
  n: 8421,
  o: "&nparsl;"
}], [44343, {
  n: new Map(restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]]))
}], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = /* @__PURE__ */ new Map([[34, "&quot;"], [38, "&amp;"], [39, "&apos;"], [60, "&lt;"], [62, "&gt;"]]);
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index)
  )
);
function encodeXML(str) {
  let ret = "";
  let lastIdx = 0;
  let match2;
  while ((match2 = xmlReplacer.exec(str)) !== null) {
    const i = match2.index;
    const char = str.charCodeAt(i);
    const next = xmlCodeMap.get(char);
    if (next !== void 0) {
      ret += str.substring(lastIdx, i) + next;
      lastIdx = i + 1;
    } else {
      ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
      lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
    }
  }
  return ret + str.substr(lastIdx);
}
function getEscaper(regex, map2) {
  return function escape(data) {
    let match2;
    let lastIdx = 0;
    let result2 = "";
    while (match2 = regex.exec(data)) {
      if (lastIdx !== match2.index) {
        result2 += data.substring(lastIdx, match2.index);
      }
      result2 += map2.get(match2[0].charCodeAt(0));
      lastIdx = match2.index + 1;
    }
    return result2 + data.substring(lastIdx);
  };
}
var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([[34, "&quot;"], [38, "&amp;"], [160, "&nbsp;"]]));
var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [160, "&nbsp;"]]));
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));
var elementNames = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map((val) => [val.toLowerCase(), val]));
var attributeNames = new Map(["definitionURL", "attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map((val) => [val.toLowerCase(), val]));
var unencodedElements = /* @__PURE__ */ new Set(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
function replaceQuotes(value) {
  return value.replace(/"/g, "&quot;");
}
function formatAttributes(attributes2, opts) {
  var _a2;
  if (!attributes2) return;
  const encode = ((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  return Object.keys(attributes2).map((key) => {
    var _a3, _b;
    const value = (_a3 = attributes2[key]) !== null && _a3 !== void 0 ? _a3 : "";
    if (opts.xmlMode === "foreign") {
      key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return `${key}="${encode(value)}"`;
  }).join(" ");
}
var singleTag = /* @__PURE__ */ new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
function render(node2, options = {}) {
  const nodes = "length" in node2 ? node2 : [node2];
  let output = "";
  for (let i = 0; i < nodes.length; i++) {
    output += renderNode(nodes[i], options);
  }
  return output;
}
function renderNode(node2, options) {
  switch (node2.type) {
    case Root:
      return render(node2.children, options);
    // @ts-expect-error We don't use `Doctype` yet
    case Doctype:
    case Directive2:
      return renderDirective(node2);
    case Comment$1:
      return renderComment(node2);
    case CDATA$1:
      return renderCdata(node2);
    case Script:
    case Style:
    case Tag:
      return renderTag(node2, options);
    case Text$1:
      return renderText(node2, options);
  }
}
var foreignModeIntegrationPoints = /* @__PURE__ */ new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]);
var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
function renderTag(elem, opts) {
  var _a2;
  if (opts.xmlMode === "foreign") {
    elem.name = (_a2 = elementNames.get(elem.name)) !== null && _a2 !== void 0 ? _a2 : elem.name;
    if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
      opts = __spreadProps(__spreadValues({}, opts), {
        xmlMode: false
      });
    }
  }
  if (!opts.xmlMode && foreignElements.has(elem.name)) {
    opts = __spreadProps(__spreadValues({}, opts), {
      xmlMode: "foreign"
    });
  }
  let tag = `<${elem.name}`;
  const attribs = formatAttributes(elem.attribs, opts);
  if (attribs) {
    tag += ` ${attribs}`;
  }
  if (elem.children.length === 0 && (opts.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    opts.selfClosingTags !== false
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    opts.selfClosingTags && singleTag.has(elem.name)
  ))) {
    if (!opts.xmlMode) tag += " ";
    tag += "/>";
  } else {
    tag += ">";
    if (elem.children.length > 0) {
      tag += render(elem.children, opts);
    }
    if (opts.xmlMode || !singleTag.has(elem.name)) {
      tag += `</${elem.name}>`;
    }
  }
  return tag;
}
function renderDirective(elem) {
  return `<${elem.data}>`;
}
function renderText(elem, opts) {
  var _a2;
  let data = elem.data || "";
  if (((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
    data = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
  }
  return data;
}
function renderCdata(elem) {
  return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
  return `<!--${elem.data}-->`;
}
function getOuterHTML(node2, options) {
  return render(node2, options);
}
function getInnerHTML(node2, options) {
  return hasChildren(node2) ? node2.children.map((node3) => getOuterHTML(node3, options)).join("") : "";
}
function getText(node2) {
  if (Array.isArray(node2)) return node2.map(getText).join("");
  if (isTag(node2)) return node2.name === "br" ? "\n" : getText(node2.children);
  if (isCDATA(node2)) return getText(node2.children);
  if (isText(node2)) return node2.data;
  return "";
}
function textContent(node2) {
  if (Array.isArray(node2)) return node2.map(textContent).join("");
  if (hasChildren(node2) && !isComment(node2)) {
    return textContent(node2.children);
  }
  if (isText(node2)) return node2.data;
  return "";
}
function innerText(node2) {
  if (Array.isArray(node2)) return node2.map(innerText).join("");
  if (hasChildren(node2) && (node2.type === ElementType.Tag || isCDATA(node2))) {
    return innerText(node2.children);
  }
  if (isText(node2)) return node2.data;
  return "";
}
function getChildren(elem) {
  return hasChildren(elem) ? elem.children : [];
}
function getParent(elem) {
  return elem.parent || null;
}
function getSiblings(elem) {
  const parent = getParent(elem);
  if (parent != null) return getChildren(parent);
  const siblings = [elem];
  let {
    prev,
    next
  } = elem;
  while (prev != null) {
    siblings.unshift(prev);
    ({
      prev
    } = prev);
  }
  while (next != null) {
    siblings.push(next);
    ({
      next
    } = next);
  }
  return siblings;
}
function getAttributeValue(elem, name) {
  var _a2;
  return (_a2 = elem.attribs) === null || _a2 === void 0 ? void 0 : _a2[name];
}
function hasAttrib(elem, name) {
  return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
}
function getName(elem) {
  return elem.name;
}
function nextElementSibling(elem) {
  let {
    next
  } = elem;
  while (next !== null && !isTag(next)) ({
    next
  } = next);
  return next;
}
function prevElementSibling(elem) {
  let {
    prev
  } = elem;
  while (prev !== null && !isTag(prev)) ({
    prev
  } = prev);
  return prev;
}
function removeElement(elem) {
  if (elem.prev) elem.prev.next = elem.next;
  if (elem.next) elem.next.prev = elem.prev;
  if (elem.parent) {
    const childs = elem.parent.children;
    const childsIndex = childs.lastIndexOf(elem);
    if (childsIndex >= 0) {
      childs.splice(childsIndex, 1);
    }
  }
  elem.next = null;
  elem.prev = null;
  elem.parent = null;
}
function replaceElement(elem, replacement) {
  const prev = replacement.prev = elem.prev;
  if (prev) {
    prev.next = replacement;
  }
  const next = replacement.next = elem.next;
  if (next) {
    next.prev = replacement;
  }
  const parent = replacement.parent = elem.parent;
  if (parent) {
    const childs = parent.children;
    childs[childs.lastIndexOf(elem)] = replacement;
    elem.parent = null;
  }
}
function appendChild(parent, child) {
  removeElement(child);
  child.next = null;
  child.parent = parent;
  if (parent.children.push(child) > 1) {
    const sibling = parent.children[parent.children.length - 2];
    sibling.next = child;
    child.prev = sibling;
  } else {
    child.prev = null;
  }
}
function append(elem, next) {
  removeElement(next);
  const {
    parent
  } = elem;
  const currNext = elem.next;
  next.next = currNext;
  next.prev = elem;
  elem.next = next;
  next.parent = parent;
  if (currNext) {
    currNext.prev = next;
    if (parent) {
      const childs = parent.children;
      childs.splice(childs.lastIndexOf(currNext), 0, next);
    }
  } else if (parent) {
    parent.children.push(next);
  }
}
function prependChild(parent, child) {
  removeElement(child);
  child.parent = parent;
  child.prev = null;
  if (parent.children.unshift(child) !== 1) {
    const sibling = parent.children[1];
    sibling.prev = child;
    child.next = sibling;
  } else {
    child.next = null;
  }
}
function prepend(elem, prev) {
  removeElement(prev);
  const {
    parent
  } = elem;
  if (parent) {
    const childs = parent.children;
    childs.splice(childs.indexOf(elem), 0, prev);
  }
  if (elem.prev) {
    elem.prev.next = prev;
  }
  prev.parent = parent;
  prev.prev = elem.prev;
  prev.next = elem;
  elem.prev = prev;
}
function filter3(test, node2, recurse = true, limit = Infinity) {
  return find(test, Array.isArray(node2) ? node2 : [node2], recurse, limit);
}
function find(test, nodes, recurse, limit) {
  const result2 = [];
  const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (indexStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (test(elem)) {
      result2.push(elem);
      if (--limit <= 0) return result2;
    }
    if (recurse && hasChildren(elem) && elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
function findOneChild(test, nodes) {
  return nodes.find(test);
}
function findOne(test, nodes, recurse = true) {
  const searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
  for (let i = 0; i < searchedNodes.length; i++) {
    const node2 = searchedNodes[i];
    if (isTag(node2) && test(node2)) {
      return node2;
    }
    if (recurse && hasChildren(node2) && node2.children.length > 0) {
      const found = findOne(test, node2.children, true);
      if (found) return found;
    }
  }
  return null;
}
function existsOne(test, nodes) {
  return (Array.isArray(nodes) ? nodes : [nodes]).some((node2) => isTag(node2) && test(node2) || hasChildren(node2) && existsOne(test, node2.children));
}
function findAll(test, nodes) {
  const result2 = [];
  const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (isTag(elem) && test(elem)) result2.push(elem);
    if (hasChildren(elem) && elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
var Checks = {
  tag_name(name) {
    if (typeof name === "function") {
      return (elem) => isTag(elem) && name(elem.name);
    } else if (name === "*") {
      return isTag;
    }
    return (elem) => isTag(elem) && elem.name === name;
  },
  tag_type(type) {
    if (typeof type === "function") {
      return (elem) => type(elem.type);
    }
    return (elem) => elem.type === type;
  },
  tag_contains(data) {
    if (typeof data === "function") {
      return (elem) => isText(elem) && data(elem.data);
    }
    return (elem) => isText(elem) && elem.data === data;
  }
};
function getAttribCheck(attrib, value) {
  if (typeof value === "function") {
    return (elem) => isTag(elem) && value(elem.attribs[attrib]);
  }
  return (elem) => isTag(elem) && elem.attribs[attrib] === value;
}
function combineFuncs(a, b) {
  return (elem) => a(elem) || b(elem);
}
function compileTest(options) {
  const funcs = Object.keys(options).map((key) => {
    const value = options[key];
    return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
  });
  return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options, node2) {
  const test = compileTest(options);
  return test ? test(node2) : true;
}
function getElements(options, nodes, recurse, limit = Infinity) {
  const test = compileTest(options);
  return test ? filter3(test, nodes, recurse, limit) : [];
}
function getElementById(id, nodes, recurse = true) {
  if (!Array.isArray(nodes)) nodes = [nodes];
  return findOne(getAttribCheck("id", id), nodes, recurse);
}
function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
  return filter3(Checks["tag_name"](tagName), nodes, recurse, limit);
}
function getElementsByClassName(className, nodes, recurse = true, limit = Infinity) {
  return filter3(getAttribCheck("class", className), nodes, recurse, limit);
}
function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
  return filter3(Checks["tag_type"](type), nodes, recurse, limit);
}
function removeSubsets(nodes) {
  let idx = nodes.length;
  while (--idx >= 0) {
    const node2 = nodes[idx];
    if (idx > 0 && nodes.lastIndexOf(node2, idx - 1) >= 0) {
      nodes.splice(idx, 1);
      continue;
    }
    for (let ancestor = node2.parent; ancestor; ancestor = ancestor.parent) {
      if (nodes.includes(ancestor)) {
        nodes.splice(idx, 1);
        break;
      }
    }
  }
  return nodes;
}
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
function compareDocumentPosition(nodeA, nodeB) {
  const aParents = [];
  const bParents = [];
  if (nodeA === nodeB) {
    return 0;
  }
  let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
  while (current) {
    aParents.unshift(current);
    current = current.parent;
  }
  current = hasChildren(nodeB) ? nodeB : nodeB.parent;
  while (current) {
    bParents.unshift(current);
    current = current.parent;
  }
  const maxIdx = Math.min(aParents.length, bParents.length);
  let idx = 0;
  while (idx < maxIdx && aParents[idx] === bParents[idx]) {
    idx++;
  }
  if (idx === 0) {
    return DocumentPosition.DISCONNECTED;
  }
  const sharedParent = aParents[idx - 1];
  const siblings = sharedParent.children;
  const aSibling = aParents[idx];
  const bSibling = bParents[idx];
  if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
    if (sharedParent === nodeB) {
      return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
    }
    return DocumentPosition.FOLLOWING;
  }
  if (sharedParent === nodeA) {
    return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
  }
  return DocumentPosition.PRECEDING;
}
function uniqueSort(nodes) {
  nodes = nodes.filter((node2, i, arr) => !arr.includes(node2, i + 1));
  nodes.sort((a, b) => {
    const relative2 = compareDocumentPosition(a, b);
    if (relative2 & DocumentPosition.PRECEDING) {
      return -1;
    } else if (relative2 & DocumentPosition.FOLLOWING) {
      return 1;
    }
    return 0;
  });
  return nodes;
}
function getFeed(doc) {
  const feedRoot = getOneElement(isValidFeed, doc);
  return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
}
function getAtomFeed(feedRoot) {
  var _a2;
  const childs = feedRoot.children;
  const feed = {
    type: "atom",
    items: getElementsByTagName("entry", childs).map((item) => {
      var _a3;
      const {
        children
      } = item;
      const entry = {
        media: getMediaElements(children)
      };
      addConditionally(entry, "id", "id", children);
      addConditionally(entry, "title", "title", children);
      const href2 = (_a3 = getOneElement("link", children)) === null || _a3 === void 0 ? void 0 : _a3.attribs["href"];
      if (href2) {
        entry.link = href2;
      }
      const description = fetch("summary", children) || fetch("content", children);
      if (description) {
        entry.description = description;
      }
      const pubDate = fetch("updated", children);
      if (pubDate) {
        entry.pubDate = new Date(pubDate);
      }
      return entry;
    })
  };
  addConditionally(feed, "id", "id", childs);
  addConditionally(feed, "title", "title", childs);
  const href = (_a2 = getOneElement("link", childs)) === null || _a2 === void 0 ? void 0 : _a2.attribs["href"];
  if (href) {
    feed.link = href;
  }
  addConditionally(feed, "description", "subtitle", childs);
  const updated = fetch("updated", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "email", childs, true);
  return feed;
}
function getRssFeed(feedRoot) {
  var _a2, _b;
  const childs = (_b = (_a2 = getOneElement("channel", feedRoot.children)) === null || _a2 === void 0 ? void 0 : _a2.children) !== null && _b !== void 0 ? _b : [];
  const feed = {
    type: feedRoot.name.substr(0, 3),
    id: "",
    items: getElementsByTagName("item", feedRoot.children).map((item) => {
      const {
        children
      } = item;
      const entry = {
        media: getMediaElements(children)
      };
      addConditionally(entry, "id", "guid", children);
      addConditionally(entry, "title", "title", children);
      addConditionally(entry, "link", "link", children);
      addConditionally(entry, "description", "description", children);
      const pubDate = fetch("pubDate", children) || fetch("dc:date", children);
      if (pubDate) entry.pubDate = new Date(pubDate);
      return entry;
    })
  };
  addConditionally(feed, "title", "title", childs);
  addConditionally(feed, "link", "link", childs);
  addConditionally(feed, "description", "description", childs);
  const updated = fetch("lastBuildDate", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "managingEditor", childs, true);
  return feed;
}
var MEDIA_KEYS_STRING = ["url", "type", "lang"];
var MEDIA_KEYS_INT = ["fileSize", "bitrate", "framerate", "samplingrate", "channels", "duration", "height", "width"];
function getMediaElements(where) {
  return getElementsByTagName("media:content", where).map((elem) => {
    const {
      attribs
    } = elem;
    const media = {
      medium: attribs["medium"],
      isDefault: !!attribs["isDefault"]
    };
    for (const attrib of MEDIA_KEYS_STRING) {
      if (attribs[attrib]) {
        media[attrib] = attribs[attrib];
      }
    }
    for (const attrib of MEDIA_KEYS_INT) {
      if (attribs[attrib]) {
        media[attrib] = parseInt(attribs[attrib], 10);
      }
    }
    if (attribs["expression"]) {
      media.expression = attribs["expression"];
    }
    return media;
  });
}
function getOneElement(tagName, node2) {
  return getElementsByTagName(tagName, node2, true, 1)[0];
}
function fetch(tagName, where, recurse = false) {
  return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
}
function addConditionally(obj, prop, tagName, where, recurse = false) {
  const val = fetch(tagName, where, recurse);
  if (val) obj[prop] = val;
}
function isValidFeed(value) {
  return value === "rss" || value === "feed" || value === "rdf:RDF";
}
var DomUtils = Object.freeze({
  __proto__: null,
  get DocumentPosition() {
    return DocumentPosition;
  },
  append,
  appendChild,
  compareDocumentPosition,
  existsOne,
  filter: filter3,
  find,
  findAll,
  findOne,
  findOneChild,
  getAttributeValue,
  getChildren,
  getElementById,
  getElements,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagType,
  getFeed,
  getInnerHTML,
  getName,
  getOuterHTML,
  getParent,
  getSiblings,
  getText,
  hasAttrib,
  hasChildren,
  innerText,
  isCDATA,
  isComment,
  isDocument,
  isTag,
  isText,
  nextElementSibling,
  prepend,
  prependChild,
  prevElementSibling,
  removeElement,
  removeSubsets,
  replaceElement,
  testElement,
  textContent,
  uniqueSort
});
var boolbase$1;
var hasRequiredBoolbase;
function requireBoolbase() {
  if (hasRequiredBoolbase) return boolbase$1;
  hasRequiredBoolbase = 1;
  boolbase$1 = {
    trueFunc: function trueFunc() {
      return true;
    },
    falseFunc: function falseFunc() {
      return false;
    }
  };
  return boolbase$1;
}
var boolbaseExports = requireBoolbase();
var boolbase = getDefaultExportFromCjs(boolbaseExports);
var SelectorType;
(function(SelectorType2) {
  SelectorType2["Attribute"] = "attribute";
  SelectorType2["Pseudo"] = "pseudo";
  SelectorType2["PseudoElement"] = "pseudo-element";
  SelectorType2["Tag"] = "tag";
  SelectorType2["Universal"] = "universal";
  SelectorType2["Adjacent"] = "adjacent";
  SelectorType2["Child"] = "child";
  SelectorType2["Descendant"] = "descendant";
  SelectorType2["Parent"] = "parent";
  SelectorType2["Sibling"] = "sibling";
  SelectorType2["ColumnCombinator"] = "column-combinator";
})(SelectorType || (SelectorType = {}));
var AttributeAction;
(function(AttributeAction2) {
  AttributeAction2["Any"] = "any";
  AttributeAction2["Element"] = "element";
  AttributeAction2["End"] = "end";
  AttributeAction2["Equals"] = "equals";
  AttributeAction2["Exists"] = "exists";
  AttributeAction2["Hyphen"] = "hyphen";
  AttributeAction2["Not"] = "not";
  AttributeAction2["Start"] = "start";
})(AttributeAction || (AttributeAction = {}));
var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
var actionTypes = /* @__PURE__ */ new Map([[126, AttributeAction.Element], [94, AttributeAction.Start], [36, AttributeAction.End], [42, AttributeAction.Any], [33, AttributeAction.Not], [124, AttributeAction.Hyphen]]);
var unpackPseudos = /* @__PURE__ */ new Set(["has", "not", "matches", "is", "where", "host", "host-context"]);
function isTraversal$1(selector) {
  switch (selector.type) {
    case SelectorType.Adjacent:
    case SelectorType.Child:
    case SelectorType.Descendant:
    case SelectorType.Parent:
    case SelectorType.Sibling:
    case SelectorType.ColumnCombinator:
      return true;
    default:
      return false;
  }
}
var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
function funescape(_, escaped, escapedWhitespace) {
  const high = parseInt(escaped, 16) - 65536;
  return high !== high || escapedWhitespace ? escaped : high < 0 ? (
    // BMP codepoint
    String.fromCharCode(high + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
  );
}
function unescapeCSS(str) {
  return str.replace(reEscape, funescape);
}
function isQuote(c) {
  return c === 39 || c === 34;
}
function isWhitespace$1(c) {
  return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
}
function parse$1(selector) {
  const subselects2 = [];
  const endIndex = parseSelector(subselects2, `${selector}`, 0);
  if (endIndex < selector.length) {
    throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
  }
  return subselects2;
}
function parseSelector(subselects2, selector, selectorIndex) {
  let tokens = [];
  function getName2(offset) {
    const match2 = selector.slice(selectorIndex + offset).match(reName);
    if (!match2) {
      throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
    }
    const [name] = match2;
    selectorIndex += offset + name.length;
    return unescapeCSS(name);
  }
  function stripWhitespace(offset) {
    selectorIndex += offset;
    while (selectorIndex < selector.length && isWhitespace$1(selector.charCodeAt(selectorIndex))) {
      selectorIndex++;
    }
  }
  function readValueWithParenthesis() {
    selectorIndex += 1;
    const start = selectorIndex;
    let counter = 1;
    for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) {
      if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
        counter++;
      } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
        counter--;
      }
    }
    if (counter) {
      throw new Error("Parenthesis not matched");
    }
    return unescapeCSS(selector.slice(start, selectorIndex - 1));
  }
  function isEscaped(pos) {
    let slashCount = 0;
    while (selector.charCodeAt(--pos) === 92) slashCount++;
    return (slashCount & 1) === 1;
  }
  function ensureNotTraversal() {
    if (tokens.length > 0 && isTraversal$1(tokens[tokens.length - 1])) {
      throw new Error("Did not expect successive traversals.");
    }
  }
  function addTraversal(type) {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens[tokens.length - 1].type = type;
      return;
    }
    ensureNotTraversal();
    tokens.push({
      type
    });
  }
  function addSpecialAttribute(name, action) {
    tokens.push({
      type: SelectorType.Attribute,
      name,
      action,
      value: getName2(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function finalizeSubselector() {
    if (tokens.length && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens.pop();
    }
    if (tokens.length === 0) {
      throw new Error("Empty sub-selector");
    }
    subselects2.push(tokens);
  }
  stripWhitespace(0);
  if (selector.length === selectorIndex) {
    return selectorIndex;
  }
  loop: while (selectorIndex < selector.length) {
    const firstChar = selector.charCodeAt(selectorIndex);
    switch (firstChar) {
      // Whitespace
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
          ensureNotTraversal();
          tokens.push({
            type: SelectorType.Descendant
          });
        }
        stripWhitespace(1);
        break;
      }
      // Traversals
      case 62: {
        addTraversal(SelectorType.Child);
        stripWhitespace(1);
        break;
      }
      case 60: {
        addTraversal(SelectorType.Parent);
        stripWhitespace(1);
        break;
      }
      case 126: {
        addTraversal(SelectorType.Sibling);
        stripWhitespace(1);
        break;
      }
      case 43: {
        addTraversal(SelectorType.Adjacent);
        stripWhitespace(1);
        break;
      }
      // Special attribute selectors: .class, #id
      case 46: {
        addSpecialAttribute("class", AttributeAction.Element);
        break;
      }
      case 35: {
        addSpecialAttribute("id", AttributeAction.Equals);
        break;
      }
      case 91: {
        stripWhitespace(1);
        let name;
        let namespace = null;
        if (selector.charCodeAt(selectorIndex) === 124) {
          name = getName2(1);
        } else if (selector.startsWith("*|", selectorIndex)) {
          namespace = "*";
          name = getName2(2);
        } else {
          name = getName2(0);
          if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
            namespace = name;
            name = getName2(1);
          }
        }
        stripWhitespace(0);
        let action = AttributeAction.Exists;
        const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
        if (possibleAction) {
          action = possibleAction;
          if (selector.charCodeAt(selectorIndex + 1) !== 61) {
            throw new Error("Expected `=`");
          }
          stripWhitespace(2);
        } else if (selector.charCodeAt(selectorIndex) === 61) {
          action = AttributeAction.Equals;
          stripWhitespace(1);
        }
        let value = "";
        let ignoreCase = null;
        if (action !== "exists") {
          if (isQuote(selector.charCodeAt(selectorIndex))) {
            const quote = selector.charCodeAt(selectorIndex);
            let sectionEnd = selectorIndex + 1;
            while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
              sectionEnd += 1;
            }
            if (selector.charCodeAt(sectionEnd) !== quote) {
              throw new Error("Attribute value didn't end");
            }
            value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
            selectorIndex = sectionEnd + 1;
          } else {
            const valueStart = selectorIndex;
            while (selectorIndex < selector.length && (!isWhitespace$1(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
              selectorIndex += 1;
            }
            value = unescapeCSS(selector.slice(valueStart, selectorIndex));
          }
          stripWhitespace(0);
          const forceIgnore = selector.charCodeAt(selectorIndex) | 32;
          if (forceIgnore === 115) {
            ignoreCase = false;
            stripWhitespace(1);
          } else if (forceIgnore === 105) {
            ignoreCase = true;
            stripWhitespace(1);
          }
        }
        if (selector.charCodeAt(selectorIndex) !== 93) {
          throw new Error("Attribute selector didn't terminate");
        }
        selectorIndex += 1;
        const attributeSelector = {
          type: SelectorType.Attribute,
          name,
          action,
          value,
          namespace,
          ignoreCase
        };
        tokens.push(attributeSelector);
        break;
      }
      case 58: {
        if (selector.charCodeAt(selectorIndex + 1) === 58) {
          tokens.push({
            type: SelectorType.PseudoElement,
            name: getName2(2).toLowerCase(),
            data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
          });
          continue;
        }
        const name = getName2(1).toLowerCase();
        let data = null;
        if (selector.charCodeAt(selectorIndex) === 40) {
          if (unpackPseudos.has(name)) {
            if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
              throw new Error(`Pseudo-selector ${name} cannot be quoted`);
            }
            data = [];
            selectorIndex = parseSelector(data, selector, selectorIndex + 1);
            if (selector.charCodeAt(selectorIndex) !== 41) {
              throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
            }
            selectorIndex += 1;
          } else {
            data = readValueWithParenthesis();
            if (stripQuotesFromPseudos.has(name)) {
              const quot = data.charCodeAt(0);
              if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) {
                data = data.slice(1, -1);
              }
            }
            data = unescapeCSS(data);
          }
        }
        tokens.push({
          type: SelectorType.Pseudo,
          name,
          data
        });
        break;
      }
      case 44: {
        finalizeSubselector();
        tokens = [];
        stripWhitespace(1);
        break;
      }
      default: {
        if (selector.startsWith("/*", selectorIndex)) {
          const endIndex = selector.indexOf("*/", selectorIndex + 2);
          if (endIndex < 0) {
            throw new Error("Comment was not terminated");
          }
          selectorIndex = endIndex + 2;
          if (tokens.length === 0) {
            stripWhitespace(0);
          }
          break;
        }
        let namespace = null;
        let name;
        if (firstChar === 42) {
          selectorIndex += 1;
          name = "*";
        } else if (firstChar === 124) {
          name = "";
          if (selector.charCodeAt(selectorIndex + 1) === 124) {
            addTraversal(SelectorType.ColumnCombinator);
            stripWhitespace(2);
            break;
          }
        } else if (reName.test(selector.slice(selectorIndex))) {
          name = getName2(0);
        } else {
          break loop;
        }
        if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
          namespace = name;
          if (selector.charCodeAt(selectorIndex + 1) === 42) {
            name = "*";
            selectorIndex += 2;
          } else {
            name = getName2(1);
          }
        }
        tokens.push(name === "*" ? {
          type: SelectorType.Universal,
          namespace
        } : {
          type: SelectorType.Tag,
          name,
          namespace
        });
      }
    }
  }
  finalizeSubselector();
  return selectorIndex;
}
var attribValChars = ["\\", '"'];
var pseudoValChars = [...attribValChars, "(", ")"];
new Set(attribValChars.map((c) => c.charCodeAt(0)));
new Set(pseudoValChars.map((c) => c.charCodeAt(0)));
new Set([...pseudoValChars, "~", "^", "$", "*", "+", "!", "|", ":", "[", "]", " ", "."].map((c) => c.charCodeAt(0)));
var procedure = /* @__PURE__ */ new Map([[SelectorType.Universal, 50], [SelectorType.Tag, 30], [SelectorType.Attribute, 1], [SelectorType.Pseudo, 0]]);
function isTraversal(token) {
  return !procedure.has(token.type);
}
var attributes = /* @__PURE__ */ new Map([[AttributeAction.Exists, 10], [AttributeAction.Equals, 8], [AttributeAction.Not, 7], [AttributeAction.Start, 6], [AttributeAction.End, 6], [AttributeAction.Any, 5]]);
function sortByProcedure(arr) {
  const procs = arr.map(getProcedure);
  for (let i = 1; i < arr.length; i++) {
    const procNew = procs[i];
    if (procNew < 0) continue;
    for (let j = i - 1; j >= 0 && procNew < procs[j]; j--) {
      const token = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = token;
      procs[j + 1] = procs[j];
      procs[j] = procNew;
    }
  }
}
function getProcedure(token) {
  var _a2, _b;
  let proc = (_a2 = procedure.get(token.type)) !== null && _a2 !== void 0 ? _a2 : -1;
  if (token.type === SelectorType.Attribute) {
    proc = (_b = attributes.get(token.action)) !== null && _b !== void 0 ? _b : 4;
    if (token.action === AttributeAction.Equals && token.name === "id") {
      proc = 9;
    }
    if (token.ignoreCase) {
      proc >>= 1;
    }
  } else if (token.type === SelectorType.Pseudo) {
    if (!token.data) {
      proc = 3;
    } else if (token.name === "has" || token.name === "contains") {
      proc = 0;
    } else if (Array.isArray(token.data)) {
      proc = Math.min(...token.data.map((d) => Math.min(...d.map(getProcedure))));
      if (proc < 0) {
        proc = 0;
      }
    } else {
      proc = 2;
    }
  }
  return proc;
}
var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
function escapeRegex(value) {
  return value.replace(reChars, "\\$&");
}
var caseInsensitiveAttributes = /* @__PURE__ */ new Set(["accept", "accept-charset", "align", "alink", "axis", "bgcolor", "charset", "checked", "clear", "codetype", "color", "compact", "declare", "defer", "dir", "direction", "disabled", "enctype", "face", "frame", "hreflang", "http-equiv", "lang", "language", "link", "media", "method", "multiple", "nohref", "noresize", "noshade", "nowrap", "readonly", "rel", "rev", "rules", "scope", "scrolling", "selected", "shape", "target", "text", "type", "valign", "valuetype", "vlink"]);
function shouldIgnoreCase(selector, options) {
  return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
}
var attributeRules = {
  equals(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name
    } = data;
    let {
      value
    } = data;
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length === value.length && attr.toLowerCase() === value && next(elem);
      };
    }
    return (elem) => adapter.getAttributeValue(elem, name) === value && next(elem);
  },
  hyphen(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name
    } = data;
    let {
      value
    } = data;
    const len = value.length;
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return function hyphenIC(elem) {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len).toLowerCase() === value && next(elem);
      };
    }
    return function hyphen(elem) {
      const attr = adapter.getAttributeValue(elem, name);
      return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len) === value && next(elem);
    };
  },
  element(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name,
      value
    } = data;
    if (/\s/.test(value)) {
      return boolbase.falseFunc;
    }
    const regex = new RegExp(`(?:^|\\s)${escapeRegex(value)}(?:$|\\s)`, shouldIgnoreCase(data, options) ? "i" : "");
    return function element(elem) {
      const attr = adapter.getAttributeValue(elem, name);
      return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
    };
  },
  exists(next, {
    name
  }, {
    adapter
  }) {
    return (elem) => adapter.hasAttrib(elem, name) && next(elem);
  },
  start(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name
    } = data;
    let {
      value
    } = data;
    const len = value.length;
    if (len === 0) {
      return boolbase.falseFunc;
    }
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length >= len && attr.substr(0, len).toLowerCase() === value && next(elem);
      };
    }
    return (elem) => {
      var _a2;
      return !!((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.startsWith(value)) && next(elem);
    };
  },
  end(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name
    } = data;
    let {
      value
    } = data;
    const len = -value.length;
    if (len === 0) {
      return boolbase.falseFunc;
    }
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        var _a2;
        return ((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.substr(len).toLowerCase()) === value && next(elem);
      };
    }
    return (elem) => {
      var _a2;
      return !!((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.endsWith(value)) && next(elem);
    };
  },
  any(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name,
      value
    } = data;
    if (value === "") {
      return boolbase.falseFunc;
    }
    if (shouldIgnoreCase(data, options)) {
      const regex = new RegExp(escapeRegex(value), "i");
      return function anyIC(elem) {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
      };
    }
    return (elem) => {
      var _a2;
      return !!((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.includes(value)) && next(elem);
    };
  },
  not(next, data, options) {
    const {
      adapter
    } = options;
    const {
      name
    } = data;
    let {
      value
    } = data;
    if (value === "") {
      return (elem) => !!adapter.getAttributeValue(elem, name) && next(elem);
    } else if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr = adapter.getAttributeValue(elem, name);
        return (attr == null || attr.length !== value.length || attr.toLowerCase() !== value) && next(elem);
      };
    }
    return (elem) => adapter.getAttributeValue(elem, name) !== value && next(elem);
  }
};
var whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
var ZERO = "0".charCodeAt(0);
var NINE = "9".charCodeAt(0);
function parse(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number !== null && number !== void 0 ? number : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number = readNumber();
    } else {
      sign = number = 0;
    }
  }
  if (number === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0) return boolbase.falseFunc;
  if (a === -1) return (index) => index <= b;
  if (a === 0) return (index) => index === b;
  if (a === 1) return b < 0 ? boolbase.trueFunc : (index) => index >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index) => index >= b && index % absA === bMod : (index) => index <= b && index % absA === bMod;
}
function nthCheck(formula) {
  return compile(parse(formula));
}
function getChildFunc(next, adapter) {
  return (elem) => {
    const parent = adapter.getParent(elem);
    return parent != null && adapter.isTag(parent) && next(elem);
  };
}
var filters = {
  contains(next, text, {
    adapter
  }) {
    return function contains(elem) {
      return next(elem) && adapter.getText(elem).includes(text);
    };
  },
  icontains(next, text, {
    adapter
  }) {
    const itext = text.toLowerCase();
    return function icontains(elem) {
      return next(elem) && adapter.getText(elem).toLowerCase().includes(itext);
    };
  },
  // Location specific methods
  "nth-child"(next, rule2, {
    adapter,
    equals
  }) {
    const func = nthCheck(rule2);
    if (func === boolbase.falseFunc) return boolbase.falseFunc;
    if (func === boolbase.trueFunc) return getChildFunc(next, adapter);
    return function nthChild(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = 0; i < siblings.length; i++) {
        if (equals(elem, siblings[i])) break;
        if (adapter.isTag(siblings[i])) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-child"(next, rule2, {
    adapter,
    equals
  }) {
    const func = nthCheck(rule2);
    if (func === boolbase.falseFunc) return boolbase.falseFunc;
    if (func === boolbase.trueFunc) return getChildFunc(next, adapter);
    return function nthLastChild(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = siblings.length - 1; i >= 0; i--) {
        if (equals(elem, siblings[i])) break;
        if (adapter.isTag(siblings[i])) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-of-type"(next, rule2, {
    adapter,
    equals
  }) {
    const func = nthCheck(rule2);
    if (func === boolbase.falseFunc) return boolbase.falseFunc;
    if (func === boolbase.trueFunc) return getChildFunc(next, adapter);
    return function nthOfType(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = 0; i < siblings.length; i++) {
        const currentSibling = siblings[i];
        if (equals(elem, currentSibling)) break;
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-of-type"(next, rule2, {
    adapter,
    equals
  }) {
    const func = nthCheck(rule2);
    if (func === boolbase.falseFunc) return boolbase.falseFunc;
    if (func === boolbase.trueFunc) return getChildFunc(next, adapter);
    return function nthLastOfType(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = siblings.length - 1; i >= 0; i--) {
        const currentSibling = siblings[i];
        if (equals(elem, currentSibling)) break;
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  // TODO determine the actual root element
  root(next, _rule, {
    adapter
  }) {
    return (elem) => {
      const parent = adapter.getParent(elem);
      return (parent == null || !adapter.isTag(parent)) && next(elem);
    };
  },
  scope(next, rule2, options, context) {
    const {
      equals
    } = options;
    if (!context || context.length === 0) {
      return filters["root"](next, rule2, options);
    }
    if (context.length === 1) {
      return (elem) => equals(context[0], elem) && next(elem);
    }
    return (elem) => context.includes(elem) && next(elem);
  },
  hover: dynamicStatePseudo("isHovered"),
  visited: dynamicStatePseudo("isVisited"),
  active: dynamicStatePseudo("isActive")
};
function dynamicStatePseudo(name) {
  return function dynamicPseudo(next, _rule, {
    adapter
  }) {
    const func = adapter[name];
    if (typeof func !== "function") {
      return boolbase.falseFunc;
    }
    return function active(elem) {
      return func(elem) && next(elem);
    };
  };
}
var pseudos = {
  empty(elem, {
    adapter
  }) {
    return !adapter.getChildren(elem).some((elem2) => (
      // FIXME: `getText` call is potentially expensive.
      adapter.isTag(elem2) || adapter.getText(elem2) !== ""
    ));
  },
  "first-child"(elem, {
    adapter,
    equals
  }) {
    if (adapter.prevElementSibling) {
      return adapter.prevElementSibling(elem) == null;
    }
    const firstChild = adapter.getSiblings(elem).find((elem2) => adapter.isTag(elem2));
    return firstChild != null && equals(elem, firstChild);
  },
  "last-child"(elem, {
    adapter,
    equals
  }) {
    const siblings = adapter.getSiblings(elem);
    for (let i = siblings.length - 1; i >= 0; i--) {
      if (equals(elem, siblings[i])) return true;
      if (adapter.isTag(siblings[i])) break;
    }
    return false;
  },
  "first-of-type"(elem, {
    adapter,
    equals
  }) {
    const siblings = adapter.getSiblings(elem);
    const elemName = adapter.getName(elem);
    for (let i = 0; i < siblings.length; i++) {
      const currentSibling = siblings[i];
      if (equals(elem, currentSibling)) return true;
      if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "last-of-type"(elem, {
    adapter,
    equals
  }) {
    const siblings = adapter.getSiblings(elem);
    const elemName = adapter.getName(elem);
    for (let i = siblings.length - 1; i >= 0; i--) {
      const currentSibling = siblings[i];
      if (equals(elem, currentSibling)) return true;
      if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "only-of-type"(elem, {
    adapter,
    equals
  }) {
    const elemName = adapter.getName(elem);
    return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName);
  },
  "only-child"(elem, {
    adapter,
    equals
  }) {
    return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling));
  }
};
function verifyPseudoArgs(func, name, subselect, argIndex) {
  if (subselect === null) {
    if (func.length > argIndex) {
      throw new Error(`Pseudo-class :${name} requires an argument`);
    }
  } else if (func.length === argIndex) {
    throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
  }
}
var aliases = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
};
var PLACEHOLDER_ELEMENT = {};
function ensureIsTag(next, adapter) {
  if (next === boolbase.falseFunc) return boolbase.falseFunc;
  return (elem) => adapter.isTag(elem) && next(elem);
}
function getNextSiblings(elem, adapter) {
  const siblings = adapter.getSiblings(elem);
  if (siblings.length <= 1) return [];
  const elemIndex = siblings.indexOf(elem);
  if (elemIndex < 0 || elemIndex === siblings.length - 1) return [];
  return siblings.slice(elemIndex + 1).filter(adapter.isTag);
}
function copyOptions(options) {
  return {
    xmlMode: !!options.xmlMode,
    lowerCaseAttributeNames: !!options.lowerCaseAttributeNames,
    lowerCaseTags: !!options.lowerCaseTags,
    quirksMode: !!options.quirksMode,
    cacheResults: !!options.cacheResults,
    pseudos: options.pseudos,
    adapter: options.adapter,
    equals: options.equals
  };
}
var is = (next, token, options, context, compileToken2) => {
  const func = compileToken2(token, copyOptions(options), context);
  return func === boolbase.trueFunc ? next : func === boolbase.falseFunc ? boolbase.falseFunc : (elem) => func(elem) && next(elem);
};
var subselects = {
  is,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: is,
  where: is,
  not(next, token, options, context, compileToken2) {
    const func = compileToken2(token, copyOptions(options), context);
    return func === boolbase.falseFunc ? next : func === boolbase.trueFunc ? boolbase.falseFunc : (elem) => !func(elem) && next(elem);
  },
  has(next, subselect, options, _context, compileToken2) {
    const {
      adapter
    } = options;
    const opts = copyOptions(options);
    opts.relativeSelector = true;
    const context = subselect.some((s) => s.some(isTraversal)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [PLACEHOLDER_ELEMENT]
    ) : void 0;
    const compiled = compileToken2(subselect, opts, context);
    if (compiled === boolbase.falseFunc) return boolbase.falseFunc;
    const hasElement = ensureIsTag(compiled, adapter);
    if (context && compiled !== boolbase.trueFunc) {
      const {
        shouldTestNextSiblings = false
      } = compiled;
      return (elem) => {
        if (!next(elem)) return false;
        context[0] = elem;
        const childs = adapter.getChildren(elem);
        const nextElements = shouldTestNextSiblings ? [...childs, ...getNextSiblings(elem, adapter)] : childs;
        return adapter.existsOne(hasElement, nextElements);
      };
    }
    return (elem) => next(elem) && adapter.existsOne(hasElement, adapter.getChildren(elem));
  }
};
function compilePseudoSelector(next, selector, options, context, compileToken2) {
  var _a2;
  const {
    name,
    data
  } = selector;
  if (Array.isArray(data)) {
    if (!(name in subselects)) {
      throw new Error(`Unknown pseudo-class :${name}(${data})`);
    }
    return subselects[name](next, data, options, context, compileToken2);
  }
  const userPseudo = (_a2 = options.pseudos) === null || _a2 === void 0 ? void 0 : _a2[name];
  const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
  if (typeof stringPseudo === "string") {
    if (data != null) {
      throw new Error(`Pseudo ${name} doesn't have any arguments`);
    }
    const alias = parse$1(stringPseudo);
    return subselects["is"](next, alias, options, context, compileToken2);
  }
  if (typeof userPseudo === "function") {
    verifyPseudoArgs(userPseudo, name, data, 1);
    return (elem) => userPseudo(elem, data) && next(elem);
  }
  if (name in filters) {
    return filters[name](next, data, options, context);
  }
  if (name in pseudos) {
    const pseudo = pseudos[name];
    verifyPseudoArgs(pseudo, name, data, 2);
    return (elem) => pseudo(elem, options, data) && next(elem);
  }
  throw new Error(`Unknown pseudo-class :${name}`);
}
function getElementParent(node2, adapter) {
  const parent = adapter.getParent(node2);
  if (parent && adapter.isTag(parent)) {
    return parent;
  }
  return null;
}
function compileGeneralSelector(next, selector, options, context, compileToken2) {
  const {
    adapter,
    equals
  } = options;
  switch (selector.type) {
    case SelectorType.PseudoElement: {
      throw new Error("Pseudo-elements are not supported by css-select");
    }
    case SelectorType.ColumnCombinator: {
      throw new Error("Column combinators are not yet supported by css-select");
    }
    case SelectorType.Attribute: {
      if (selector.namespace != null) {
        throw new Error("Namespaced attributes are not yet supported by css-select");
      }
      if (!options.xmlMode || options.lowerCaseAttributeNames) {
        selector.name = selector.name.toLowerCase();
      }
      return attributeRules[selector.action](next, selector, options);
    }
    case SelectorType.Pseudo: {
      return compilePseudoSelector(next, selector, options, context, compileToken2);
    }
    // Tags
    case SelectorType.Tag: {
      if (selector.namespace != null) {
        throw new Error("Namespaced tag names are not yet supported by css-select");
      }
      let {
        name
      } = selector;
      if (!options.xmlMode || options.lowerCaseTags) {
        name = name.toLowerCase();
      }
      return function tag(elem) {
        return adapter.getName(elem) === name && next(elem);
      };
    }
    // Traversal
    case SelectorType.Descendant: {
      if (options.cacheResults === false || typeof WeakSet === "undefined") {
        return function descendant(elem) {
          let current = elem;
          while (current = getElementParent(current, adapter)) {
            if (next(current)) {
              return true;
            }
          }
          return false;
        };
      }
      const isFalseCache = /* @__PURE__ */ new WeakSet();
      return function cachedDescendant(elem) {
        let current = elem;
        while (current = getElementParent(current, adapter)) {
          if (!isFalseCache.has(current)) {
            if (adapter.isTag(current) && next(current)) {
              return true;
            }
            isFalseCache.add(current);
          }
        }
        return false;
      };
    }
    case "_flexibleDescendant": {
      return function flexibleDescendant(elem) {
        let current = elem;
        do {
          if (next(current)) return true;
        } while (current = getElementParent(current, adapter));
        return false;
      };
    }
    case SelectorType.Parent: {
      return function parent(elem) {
        return adapter.getChildren(elem).some((elem2) => adapter.isTag(elem2) && next(elem2));
      };
    }
    case SelectorType.Child: {
      return function child(elem) {
        const parent = adapter.getParent(elem);
        return parent != null && adapter.isTag(parent) && next(parent);
      };
    }
    case SelectorType.Sibling: {
      return function sibling(elem) {
        const siblings = adapter.getSiblings(elem);
        for (let i = 0; i < siblings.length; i++) {
          const currentSibling = siblings[i];
          if (equals(elem, currentSibling)) break;
          if (adapter.isTag(currentSibling) && next(currentSibling)) {
            return true;
          }
        }
        return false;
      };
    }
    case SelectorType.Adjacent: {
      if (adapter.prevElementSibling) {
        return function adjacent(elem) {
          const previous = adapter.prevElementSibling(elem);
          return previous != null && next(previous);
        };
      }
      return function adjacent(elem) {
        const siblings = adapter.getSiblings(elem);
        let lastElement;
        for (let i = 0; i < siblings.length; i++) {
          const currentSibling = siblings[i];
          if (equals(elem, currentSibling)) break;
          if (adapter.isTag(currentSibling)) {
            lastElement = currentSibling;
          }
        }
        return !!lastElement && next(lastElement);
      };
    }
    case SelectorType.Universal: {
      if (selector.namespace != null && selector.namespace !== "*") {
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      }
      return next;
    }
  }
}
function compileUnsafe(selector, options, context) {
  const token = typeof selector === "string" ? parse$1(selector) : selector;
  return compileToken(token, options, context);
}
function includesScopePseudo(t) {
  return t.type === SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data) => data.some(includesScopePseudo)));
}
var DESCENDANT_TOKEN = {
  type: SelectorType.Descendant
};
var FLEXIBLE_DESCENDANT_TOKEN = {
  type: "_flexibleDescendant"
};
var SCOPE_TOKEN = {
  type: SelectorType.Pseudo,
  name: "scope",
  data: null
};
function absolutize(token, {
  adapter
}, context) {
  const hasContext = !!(context === null || context === void 0 ? void 0 : context.every((e) => {
    const parent = adapter.isTag(e) && adapter.getParent(e);
    return e === PLACEHOLDER_ELEMENT || parent && adapter.isTag(parent);
  }));
  for (const t of token) {
    if (t.length > 0 && isTraversal(t[0]) && t[0].type !== SelectorType.Descendant) ;
    else if (hasContext && !t.some(includesScopePseudo)) {
      t.unshift(DESCENDANT_TOKEN);
    } else {
      continue;
    }
    t.unshift(SCOPE_TOKEN);
  }
}
function compileToken(token, options, context) {
  var _a2;
  token.forEach(sortByProcedure);
  context = (_a2 = options.context) !== null && _a2 !== void 0 ? _a2 : context;
  const isArrayContext = Array.isArray(context);
  const finalContext = context && (Array.isArray(context) ? context : [context]);
  if (options.relativeSelector !== false) {
    absolutize(token, options, finalContext);
  } else if (token.some((t) => t.length > 0 && isTraversal(t[0]))) {
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  }
  let shouldTestNextSiblings = false;
  const query = token.map((rules) => {
    if (rules.length >= 2) {
      const [first2, second] = rules;
      if (first2.type !== SelectorType.Pseudo || first2.name !== "scope") ;
      else if (isArrayContext && second.type === SelectorType.Descendant) {
        rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
      } else if (second.type === SelectorType.Adjacent || second.type === SelectorType.Sibling) {
        shouldTestNextSiblings = true;
      }
    }
    return compileRules(rules, options, finalContext);
  }).reduce(reduceRules, boolbase.falseFunc);
  query.shouldTestNextSiblings = shouldTestNextSiblings;
  return query;
}
function compileRules(rules, options, context) {
  var _a2;
  return rules.reduce((previous, rule2) => previous === boolbase.falseFunc ? boolbase.falseFunc : compileGeneralSelector(previous, rule2, options, context, compileToken), (_a2 = options.rootFunc) !== null && _a2 !== void 0 ? _a2 : boolbase.trueFunc);
}
function reduceRules(a, b) {
  if (b === boolbase.falseFunc || a === boolbase.trueFunc) {
    return a;
  }
  if (a === boolbase.falseFunc || b === boolbase.trueFunc) {
    return b;
  }
  return function combine(elem) {
    return a(elem) || b(elem);
  };
}
var defaultEquals = (a, b) => a === b;
var defaultOptions = {
  adapter: DomUtils,
  equals: defaultEquals
};
function convertOptionFormats(options) {
  var _a2, _b, _c, _d;
  const opts = options !== null && options !== void 0 ? options : defaultOptions;
  (_a2 = opts.adapter) !== null && _a2 !== void 0 ? _a2 : opts.adapter = DomUtils;
  (_b = opts.equals) !== null && _b !== void 0 ? _b : opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals;
  return opts;
}
function getSelectorFunc(searchFunc) {
  return function select(query, elements, options) {
    const opts = convertOptionFormats(options);
    if (typeof query !== "function") {
      query = compileUnsafe(query, opts, elements);
    }
    const filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
    return searchFunc(query, filteredElements, opts);
  };
}
function prepareContext(elems, adapter, shouldTestNextSiblings = false) {
  if (shouldTestNextSiblings) {
    elems = appendNextSiblings(elems, adapter);
  }
  return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
}
function appendNextSiblings(elem, adapter) {
  const elems = Array.isArray(elem) ? elem.slice(0) : [elem];
  const elemsLength = elems.length;
  for (let i = 0; i < elemsLength; i++) {
    const nextSiblings = getNextSiblings(elems[i], adapter);
    elems.push(...nextSiblings);
  }
  return elems;
}
var selectAll = getSelectorFunc((query, elems, options) => query === boolbase.falseFunc || !elems || elems.length === 0 ? [] : options.adapter.findAll(query, elems));
var selectOne = getSelectorFunc((query, elems, options) => query === boolbase.falseFunc || !elems || elems.length === 0 ? null : options.adapter.findOne(query, elems));
var htmlDecodeTree = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
);
var xmlDecodeTree = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0))
);
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a2;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
}
var CharCodes$1;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes$1 || (CharCodes$1 = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes$1.ZERO && code <= CharCodes$1.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_F || code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_Z || code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes$1.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder2 = class {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(input3, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (input3.charCodeAt(offset) === CharCodes$1.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(input3, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(input3, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(input3, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(input3, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(input3, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(input3, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(input3, offset) {
    if (offset >= input3.length) {
      return -1;
    }
    if ((input3.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes$1.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(input3, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(input3, offset);
  }
  addToNumericResult(input3, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + Number.parseInt(input3.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(input3, offset) {
    const startIndex = offset;
    while (offset < input3.length) {
      const char = input3.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(input3, startIndex, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(input3, startIndex, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(input3, offset) {
    const startIndex = offset;
    while (offset < input3.length) {
      const char = input3.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(input3, startIndex, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(input3, startIndex, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength) {
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes$1.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes$1.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(input3, offset) {
    const {
      decodeTree
    } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < input3.length; offset++, this.excess++) {
      const char = input3.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes$1.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a2;
    const {
      result: result2,
      decodeTree
    } = this;
    const valueLength = (decodeTree[result2] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result2, valueLength, this.consumed);
    (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result2, valueLength, consumed) {
    const {
      decodeTree
    } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result2] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result2 + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result2 + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function determineBranch(decodeTree, current, nodeIndex, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
  }
  let lo = nodeIndex;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midValue = decodeTree[mid];
    if (midValue < char) {
      lo = mid + 1;
    } else if (midValue > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
  CharCodes2[CharCodes2["NewLine"] = 10] = "NewLine";
  CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
  CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes2[CharCodes2["Space"] = 32] = "Space";
  CharCodes2[CharCodes2["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes2[CharCodes2["Number"] = 35] = "Number";
  CharCodes2[CharCodes2["Amp"] = 38] = "Amp";
  CharCodes2[CharCodes2["SingleQuote"] = 39] = "SingleQuote";
  CharCodes2[CharCodes2["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
  CharCodes2[CharCodes2["Slash"] = 47] = "Slash";
  CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
  CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
  CharCodes2[CharCodes2["Semi"] = 59] = "Semi";
  CharCodes2[CharCodes2["Lt"] = 60] = "Lt";
  CharCodes2[CharCodes2["Eq"] = 61] = "Eq";
  CharCodes2[CharCodes2["Gt"] = 62] = "Gt";
  CharCodes2[CharCodes2["Questionmark"] = 63] = "Questionmark";
  CharCodes2[CharCodes2["UpperA"] = 65] = "UpperA";
  CharCodes2[CharCodes2["LowerA"] = 97] = "LowerA";
  CharCodes2[CharCodes2["UpperF"] = 70] = "UpperF";
  CharCodes2[CharCodes2["LowerF"] = 102] = "LowerF";
  CharCodes2[CharCodes2["UpperZ"] = 90] = "UpperZ";
  CharCodes2[CharCodes2["LowerZ"] = 122] = "LowerZ";
  CharCodes2[CharCodes2["LowerX"] = 120] = "LowerX";
  CharCodes2[CharCodes2["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
var State;
(function(State2) {
  State2[State2["Text"] = 1] = "Text";
  State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
  State2[State2["InTagName"] = 3] = "InTagName";
  State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
  State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State2[State2["InAttributeName"] = 9] = "InAttributeName";
  State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
  State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State2[State2["InDeclaration"] = 16] = "InDeclaration";
  State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State2[State2["BeforeComment"] = 18] = "BeforeComment";
  State2[State2["CDATASequence"] = 19] = "CDATASequence";
  State2[State2["InSpecialComment"] = 20] = "InSpecialComment";
  State2[State2["InCommentLike"] = 21] = "InCommentLike";
  State2[State2["BeforeSpecialS"] = 22] = "BeforeSpecialS";
  State2[State2["BeforeSpecialT"] = 23] = "BeforeSpecialT";
  State2[State2["SpecialStartSequence"] = 24] = "SpecialStartSequence";
  State2[State2["InSpecialTag"] = 25] = "InSpecialTag";
  State2[State2["InEntity"] = 26] = "InEntity";
})(State || (State = {}));
function isWhitespace(c) {
  return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
  return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isASCIIAlpha(c) {
  return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
var Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `</script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]),
  // `</textarea`
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
  // `</xmp`
};
var Tokenizer = class {
  constructor({
    xmlMode = false,
    decodeEntities = true
  }, cbs) {
    this.cbs = cbs;
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.entityStart = 0;
    this.baseState = State.Text;
    this.isSpecial = false;
    this.running = true;
    this.offset = 0;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.entityDecoder = new EntityDecoder2(xmlMode ? xmlDecodeTree : htmlDecodeTree, (cp2, consumed) => this.emitCodePoint(cp2, consumed));
  }
  reset() {
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.currentSequence = void 0;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running) this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  stateText(c) {
    if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.isSpecial = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = State.InTagName;
    this.stateInTagName(c);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === CharCodes.Gt || isWhitespace(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd) {
        if (this.decodeEntities && c === CharCodes.Amp) {
          this.startEntity();
        }
      } else if (this.fastForwardTo(CharCodes.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === CharCodes.Lt);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = State.InDeclaration;
      this.stateInDeclaration(c);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(c) {
    return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
  }
  startSpecial(sequence, offset) {
    this.isSpecial = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
    this.state = State.SpecialStartSequence;
  }
  stateBeforeTagName(c) {
    if (c === CharCodes.ExclamationMark) {
      this.state = State.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Questionmark) {
      this.state = State.InProcessingInstruction;
      this.sectionStart = this.index + 1;
    } else if (this.isTagStartChar(c)) {
      const lower = c | 32;
      this.sectionStart = this.index;
      if (this.xmlMode) {
        this.state = State.InTagName;
      } else if (lower === Sequences.ScriptEnd[2]) {
        this.state = State.BeforeSpecialS;
      } else if (lower === Sequences.TitleEnd[2] || lower === Sequences.XmpEnd[2]) {
        this.state = State.BeforeSpecialT;
      } else {
        this.state = State.InTagName;
      }
    } else if (c === CharCodes.Slash) {
      this.state = State.BeforeClosingTagName;
    } else {
      this.state = State.Text;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c)) ;
    else if (c === CharCodes.Gt) {
      this.state = State.Text;
    } else {
      this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === CharCodes.Gt || isWhitespace(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterClosingTagName;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onopentagend(this.index);
      if (this.isSpecial) {
        this.state = State.InSpecialTag;
        this.sequenceIndex = 0;
      } else {
        this.state = State.Text;
      }
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Slash) {
      this.state = State.InSelfClosingTag;
    } else if (!isWhitespace(c)) {
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
      this.isSpecial = false;
    } else if (!isWhitespace(c)) {
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateInAttributeName(c) {
    if (c === CharCodes.Eq || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = this.index;
      this.state = State.AfterAttributeName;
      this.stateAfterAttributeName(c);
    }
  }
  stateAfterAttributeName(c) {
    if (c === CharCodes.Eq) {
      this.state = State.BeforeAttributeValue;
    } else if (c === CharCodes.Slash || c === CharCodes.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c) {
    if (c === CharCodes.DoubleQuote) {
      this.state = State.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.SingleQuote) {
      this.state = State.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = State.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c);
    }
  }
  handleInAttributeValue(c, quote) {
    if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
      this.state = State.BeforeAttributeName;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateInAttributeValueDoubleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c) {
    if (isWhitespace(c) || c === CharCodes.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateBeforeDeclaration(c) {
    if (c === CharCodes.OpeningSquareBracket) {
      this.state = State.CDATASequence;
      this.sequenceIndex = 0;
    } else {
      this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
    }
  }
  stateInDeclaration(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === CharCodes.Dash) {
      this.state = State.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InDeclaration;
    }
  }
  stateInSpecialComment(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    const lower = c | 32;
    if (lower === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (lower === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = State.InTagName;
      this.stateInTagName(c);
    }
  }
  stateBeforeSpecialT(c) {
    const lower = c | 32;
    switch (lower) {
      case Sequences.TitleEnd[3]: {
        this.startSpecial(Sequences.TitleEnd, 4);
        break;
      }
      case Sequences.TextareaEnd[3]: {
        this.startSpecial(Sequences.TextareaEnd, 4);
        break;
      }
      case Sequences.XmpEnd[3]: {
        this.startSpecial(Sequences.XmpEnd, 4);
        break;
      }
      default: {
        this.state = State.InTagName;
        this.stateInTagName(c);
      }
    }
  }
  startEntity() {
    this.baseState = this.state;
    this.state = State.InEntity;
    this.entityStart = this.index;
    this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State.Text || this.baseState === State.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
  }
  stateInEntity() {
    const length = this.entityDecoder.write(this.buffer, this.index - this.offset);
    if (length >= 0) {
      this.state = this.baseState;
      if (length === 0) {
        this.index = this.entityStart;
      }
    } else {
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    while (this.shouldContinue()) {
      const c = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text: {
          this.stateText(c);
          break;
        }
        case State.SpecialStartSequence: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case State.InSpecialTag: {
          this.stateInSpecialTag(c);
          break;
        }
        case State.CDATASequence: {
          this.stateCDATASequence(c);
          break;
        }
        case State.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c);
          break;
        }
        case State.InAttributeName: {
          this.stateInAttributeName(c);
          break;
        }
        case State.InCommentLike: {
          this.stateInCommentLike(c);
          break;
        }
        case State.InSpecialComment: {
          this.stateInSpecialComment(c);
          break;
        }
        case State.BeforeAttributeName: {
          this.stateBeforeAttributeName(c);
          break;
        }
        case State.InTagName: {
          this.stateInTagName(c);
          break;
        }
        case State.InClosingTagName: {
          this.stateInClosingTagName(c);
          break;
        }
        case State.BeforeTagName: {
          this.stateBeforeTagName(c);
          break;
        }
        case State.AfterAttributeName: {
          this.stateAfterAttributeName(c);
          break;
        }
        case State.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c);
          break;
        }
        case State.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c);
          break;
        }
        case State.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case State.AfterClosingTagName: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case State.BeforeSpecialS: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case State.BeforeSpecialT: {
          this.stateBeforeSpecialT(c);
          break;
        }
        case State.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c);
          break;
        }
        case State.InSelfClosingTag: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case State.InDeclaration: {
          this.stateInDeclaration(c);
          break;
        }
        case State.BeforeDeclaration: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case State.BeforeComment: {
          this.stateBeforeComment(c);
          break;
        }
        case State.InProcessingInstruction: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case State.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State.InEntity) {
      this.entityDecoder.end();
      this.state = this.baseState;
    }
    this.handleTrailingData();
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.sectionStart >= endIndex) {
      return;
    }
    if (this.state === State.InCommentLike) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex, 0);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
      }
    } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) ;
    else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitCodePoint(cp2, consumed) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      if (this.sectionStart < this.entityStart) {
        this.cbs.onattribdata(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.onattribentity(cp2);
    } else {
      if (this.sectionStart < this.entityStart) {
        this.cbs.ontext(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.ontextentity(cp2, this.sectionStart);
    }
  }
};
var formTags = /* @__PURE__ */ new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"]);
var pTag = /* @__PURE__ */ new Set(["p"]);
var tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
var ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
var rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
var openImpliesClose = /* @__PURE__ */ new Map([["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])], ["th", /* @__PURE__ */ new Set(["th"])], ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])], ["body", /* @__PURE__ */ new Set(["head", "link", "script"])], ["li", /* @__PURE__ */ new Set(["li"])], ["p", pTag], ["h1", pTag], ["h2", pTag], ["h3", pTag], ["h4", pTag], ["h5", pTag], ["h6", pTag], ["select", formTags], ["input", formTags], ["output", formTags], ["button", formTags], ["datalist", formTags], ["textarea", formTags], ["option", /* @__PURE__ */ new Set(["option"])], ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])], ["dd", ddtTags], ["dt", ddtTags], ["address", pTag], ["article", pTag], ["aside", pTag], ["blockquote", pTag], ["details", pTag], ["div", pTag], ["dl", pTag], ["fieldset", pTag], ["figcaption", pTag], ["figure", pTag], ["footer", pTag], ["form", pTag], ["header", pTag], ["hr", pTag], ["main", pTag], ["nav", pTag], ["ol", pTag], ["pre", pTag], ["section", pTag], ["table", pTag], ["ul", pTag], ["rt", rtpTags], ["rp", rtpTags], ["tbody", tableSectionTags], ["tfoot", tableSectionTags]]);
var voidElements = /* @__PURE__ */ new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
var htmlIntegrationElements = /* @__PURE__ */ new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignobject", "desc", "title"]);
var reNameEnd = /\s|\//;
var Parser = class {
  constructor(cbs, options = {}) {
    var _a2, _b, _c, _d, _e, _f;
    this.options = options;
    this.startIndex = 0;
    this.endIndex = 0;
    this.openTagStart = 0;
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack = [];
    this.buffers = [];
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
    this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
    this.htmlMode = !this.options.xmlMode;
    this.lowerCaseTagNames = (_a2 = options.lowerCaseTags) !== null && _a2 !== void 0 ? _a2 : this.htmlMode;
    this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : this.htmlMode;
    this.recognizeSelfClosing = (_c = options.recognizeSelfClosing) !== null && _c !== void 0 ? _c : !this.htmlMode;
    this.tokenizer = new ((_d = options.Tokenizer) !== null && _d !== void 0 ? _d : Tokenizer)(this.options, this);
    this.foreignContext = [!this.htmlMode];
    (_f = (_e = this.cbs).onparserinit) === null || _f === void 0 ? void 0 : _f.call(_e, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(start, endIndex) {
    var _a2, _b;
    const data = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, data);
    this.startIndex = endIndex;
  }
  /** @internal */
  ontextentity(cp2, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, fromCodePoint(cp2));
    this.startIndex = endIndex;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   */
  isVoidElement(name) {
    return this.htmlMode && voidElements.has(name);
  }
  /** @internal */
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    this.emitOpenTag(name);
  }
  emitOpenTag(name) {
    var _a2, _b, _c, _d;
    this.openTagStart = this.startIndex;
    this.tagname = name;
    const impliesClose = this.htmlMode && openImpliesClose.get(name);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
        const element = this.stack.shift();
        (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, true);
      }
    }
    if (!this.isVoidElement(name)) {
      this.stack.unshift(name);
      if (this.htmlMode) {
        if (foreignContextElements.has(name)) {
          this.foreignContext.unshift(true);
        } else if (htmlIntegrationElements.has(name)) {
          this.foreignContext.unshift(false);
        }
      }
    }
    (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
    if (this.cbs.onopentag) this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a2, _b;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b = (_a2 = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a2, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  /** @internal */
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onclosetag(start, endIndex) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    if (this.htmlMode && (foreignContextElements.has(name) || htmlIntegrationElements.has(name))) {
      this.foreignContext.shift();
    }
    if (!this.isVoidElement(name)) {
      const pos = this.stack.indexOf(name);
      if (pos !== -1) {
        for (let index = 0; index <= pos; index++) {
          const element = this.stack.shift();
          (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, index !== pos);
        }
      } else if (this.htmlMode && name === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (this.htmlMode && name === "br") {
      (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, "br");
      (_f = (_e = this.cbs).onopentag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", {}, true);
      (_h = (_g = this.cbs).onclosetag) === null || _h === void 0 ? void 0 : _h.call(_g, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.recognizeSelfClosing || this.foreignContext[0]) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  closeCurrentTag(isOpenImplied) {
    var _a2, _b;
    const name = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[0] === name) {
      (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, name, !isOpenImplied);
      this.stack.shift();
    }
  }
  /** @internal */
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
  }
  /** @internal */
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  /** @internal */
  onattribentity(cp2) {
    this.attribvalue += fromCodePoint(cp2);
  }
  /** @internal */
  onattribend(quote, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a2, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
    if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index = value.search(reNameEnd);
    let name = index < 0 ? value : value.substr(0, index);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    return name;
  }
  /** @internal */
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncomment(start, endIndex, offset) {
    var _a2, _b, _c, _d;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a2, this.getSlice(start, endIndex - offset));
    (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncdata(start, endIndex, offset) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (!this.htmlMode || this.options.recognizeCDATA) {
      (_b = (_a2 = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a2);
      (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
      (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
    } else {
      (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
      (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onend() {
    var _a2, _b;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index = 0; index < this.stack.length; index++) {
        this.cbs.onclosetag(this.stack[index], true);
      }
    }
    (_b = (_a2 = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a2);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var _a2, _b, _c, _d;
    (_b = (_a2 = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a2);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
    this.buffers.length = 0;
    this.foreignContext.length = 0;
    this.foreignContext.unshift(!this.htmlMode);
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(data) {
    this.reset();
    this.end(data);
  }
  getSlice(start, end) {
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
    while (end - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice += this.buffers[0].slice(0, end - this.bufferOffset);
    }
    return slice;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".end() after done!"));
      return;
    }
    if (chunk) this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended) this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(chunk) {
    this.write(chunk);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(chunk) {
    this.end(chunk);
  }
};
function parseDocument(data, options) {
  const handler = new DomHandler(void 0, options);
  new Parser(handler, options).end(data);
  return handler.root;
}
var picocolors_browserExports = requirePicocolors_browser();
var pc = getDefaultExportFromCjs(picocolors_browserExports);
function parseStylesheet(stylesheet) {
  return parse$2(stylesheet);
}
function serializeStylesheet(ast, options) {
  const cssParts = [];
  stringify2(ast, (result2, node2, type) => {
    if (node2?.type === "decl" && node2.value.includes("</style>")) {
      return;
    }
    if (!options.compress) {
      cssParts.push(result2);
      return;
    }
    if (node2?.type === "comment") return;
    if (node2?.type === "decl") {
      const prefix = node2.prop + node2.raws.between;
      cssParts.push(result2.replace(prefix, prefix.trim()));
      return;
    }
    if (type === "start") {
      if (node2?.type === "rule" && node2.selectors) {
        if (node2.selectors.length === 1) {
          cssParts.push(node2.selectors[0] ?? "", "{");
        } else {
          cssParts.push(node2.selectors.join(","), "{");
        }
      } else {
        cssParts.push(result2.trim());
      }
      return;
    }
    if (type === "end" && result2 === "}" && node2?.raws?.semicolon) {
      const lastItemIdx = cssParts.length - 2;
      if (lastItemIdx >= 0 && cssParts[lastItemIdx]) {
        cssParts[lastItemIdx] = cssParts[lastItemIdx].slice(0, -1);
      }
    }
    cssParts.push(result2.trim());
  });
  return cssParts.join("");
}
function markOnly(predicate) {
  return (rule2) => {
    const sel = "selectors" in rule2 ? rule2.selectors : void 0;
    if (predicate(rule2) === false) {
      rule2.$$remove = true;
    }
    if ("selectors" in rule2) {
      rule2.$$markedSelectors = rule2.selectors;
      rule2.selectors = sel;
    }
    if (rule2._other) {
      rule2._other.$$markedSelectors = rule2._other.selectors;
    }
  };
}
function applyMarkedSelectors(rule2) {
  if (rule2.$$markedSelectors) {
    rule2.selectors = rule2.$$markedSelectors;
  }
  if (rule2._other) {
    applyMarkedSelectors(rule2._other);
  }
}
function walkStyleRules(node2, iterator) {
  if (!("nodes" in node2)) {
    return;
  }
  node2.nodes = node2.nodes?.filter((rule2) => {
    if (hasNestedRules(rule2)) {
      walkStyleRules(rule2, iterator);
    }
    rule2._other = void 0;
    rule2.filterSelectors = filterSelectors;
    return iterator(rule2) !== false;
  });
}
function walkStyleRulesWithReverseMirror(node2, node22, iterator) {
  if (!node22) return walkStyleRules(node2, iterator);
  [node2.nodes, node22.nodes] = splitFilter(node2.nodes, node22.nodes, (rule2, index, _rules, rules2) => {
    const rule22 = rules2?.[index];
    if (hasNestedRules(rule2)) {
      walkStyleRulesWithReverseMirror(rule2, rule22, iterator);
    }
    rule2._other = rule22;
    rule2.filterSelectors = filterSelectors;
    return iterator(rule2) !== false;
  });
}
function hasNestedRules(rule2) {
  return "nodes" in rule2 && !!rule2.nodes?.length && (!("name" in rule2) || rule2.name !== "keyframes" && rule2.name !== "-webkit-keyframes") && rule2.nodes.some((n) => n.type === "rule" || n.type === "atrule");
}
function splitFilter(a, b, predicate) {
  const aOut = [];
  const bOut = [];
  for (let index = 0; index < a.length; index++) {
    const item = a[index];
    if (predicate(item, index, a, b)) {
      aOut.push(item);
    } else {
      bOut.push(item);
    }
  }
  return [aOut, bOut];
}
function filterSelectors(predicate) {
  if (this._other) {
    const [a, b] = splitFilter(this.selectors, this._other.selectors, predicate);
    this.selectors = a;
    this._other.selectors = b;
  } else {
    this.selectors = this.selectors.filter(predicate);
  }
}
var MEDIA_TYPES = /* @__PURE__ */ new Set(["all", "print", "screen", "speech"]);
var MEDIA_KEYWORDS = /* @__PURE__ */ new Set(["and", "not", ","]);
var MEDIA_FEATURES = new Set(["width", "aspect-ratio", "color", "color-index", "grid", "height", "monochrome", "orientation", "resolution", "scan"].flatMap((feature) => [feature, `min-${feature}`, `max-${feature}`]));
function validateMediaType(node2) {
  const {
    type: nodeType,
    value: nodeValue
  } = node2;
  if (nodeType === "media-type") {
    return MEDIA_TYPES.has(nodeValue);
  } else if (nodeType === "keyword") {
    return MEDIA_KEYWORDS.has(nodeValue);
  } else if (nodeType === "media-feature") {
    return MEDIA_FEATURES.has(nodeValue);
  }
}
function validateMediaQuery(query) {
  const mediaParserFn = "default" in mediaParser ? mediaParser.default : mediaParser;
  const mediaTree = mediaParserFn(query);
  const nodeTypes = /* @__PURE__ */ new Set(["media-type", "keyword", "media-feature"]);
  const stack = [mediaTree];
  while (stack.length > 0) {
    const node2 = stack.pop();
    if (nodeTypes.has(node2.type) && !validateMediaType(node2)) {
      return false;
    }
    if (node2.nodes) {
      stack.push(...node2.nodes);
    }
  }
  return true;
}
var classCache = null;
var idCache = null;
function buildCache(container2) {
  classCache = /* @__PURE__ */ new Set();
  idCache = /* @__PURE__ */ new Set();
  const queue = [container2];
  while (queue.length) {
    const node2 = queue.shift();
    if (node2.hasAttribute?.("class")) {
      const classList = node2.getAttribute("class").trim().split(" ");
      classList.forEach((cls) => {
        classCache.add(cls);
      });
    }
    if (node2.hasAttribute?.("id")) {
      const id = node2.getAttribute("id").trim();
      idCache.add(id);
    }
    if ("children" in node2) {
      queue.push(...node2.children.filter((child) => child.type === "tag"));
    }
  }
}
function createDocument(html) {
  const document2 = parseDocument(html, {
    decodeEntities: false
  });
  extendDocument(document2);
  extendElement(Element.prototype);
  let beastiesContainer = document2.querySelector("[data-beasties-container]");
  if (!beastiesContainer) {
    document2.documentElement?.setAttribute("data-beasties-container", "");
    beastiesContainer = document2.documentElement || document2;
  }
  document2.beastiesContainer = beastiesContainer;
  buildCache(beastiesContainer);
  return document2;
}
function serializeDocument(document2) {
  return render(document2, {
    decodeEntities: false
  });
}
var extended = false;
function extendElement(element) {
  if (extended) {
    return;
  }
  extended = true;
  Object.defineProperties(element, {
    nodeName: {
      get() {
        return this.tagName.toUpperCase();
      }
    },
    id: {
      get() {
        return this.getAttribute("id");
      },
      set(value) {
        this.setAttribute("id", value);
      }
    },
    className: {
      get() {
        return this.getAttribute("class");
      },
      set(value) {
        this.setAttribute("class", value);
      }
    },
    insertBefore: {
      value(child, referenceNode) {
        if (!referenceNode) return this.appendChild(child);
        prepend(referenceNode, child);
        return child;
      }
    },
    appendChild: {
      value(child) {
        appendChild(this, child);
        return child;
      }
    },
    removeChild: {
      value(child) {
        removeElement(child);
      }
    },
    remove: {
      value() {
        removeElement(this);
      }
    },
    textContent: {
      get() {
        return getText(this);
      },
      set(text) {
        this.children = [];
        appendChild(this, new Text(text));
      }
    },
    setAttribute: {
      value(name, value) {
        if (this.attribs == null) this.attribs = {};
        if (value == null) value = "";
        this.attribs[name] = value;
      }
    },
    removeAttribute: {
      value(name) {
        if (this.attribs != null) {
          delete this.attribs[name];
        }
      }
    },
    getAttribute: {
      value(name) {
        return this.attribs != null && this.attribs[name];
      }
    },
    hasAttribute: {
      value(name) {
        return this.attribs != null && this.attribs[name] != null;
      }
    },
    getAttributeNode: {
      value(name) {
        const value = this.getAttribute(name);
        if (value != null) return {
          specified: true,
          value
        };
      }
    },
    exists: {
      value(sel) {
        return cachedQuerySelector(sel, this);
      }
    },
    querySelector: {
      value(sel) {
        return selectOne(sel, this);
      }
    },
    querySelectorAll: {
      value(sel) {
        return selectAll(sel, this);
      }
    }
  });
}
function extendDocument(document2) {
  Object.defineProperties(document2, {
    // document is just an Element in htmlparser2, giving it a nodeType of ELEMENT_NODE.
    // TODO: verify if these are needed for css-select
    nodeType: {
      get() {
        return 9;
      }
    },
    contentType: {
      get() {
        return "text/html";
      }
    },
    nodeName: {
      get() {
        return "#document";
      }
    },
    documentElement: {
      get() {
        return this.children.find((child) => "tagName" in child && String(child.tagName).toLowerCase() === "html");
      }
    },
    head: {
      get() {
        return this.querySelector("head");
      }
    },
    body: {
      get() {
        return this.querySelector("body");
      }
    },
    createElement: {
      value(name) {
        return new Element(name, {});
      }
    },
    createTextNode: {
      value(text) {
        return new Text(text);
      }
    },
    exists: {
      value(sel) {
        return cachedQuerySelector(sel, this);
      }
    },
    querySelector: {
      value(sel) {
        return selectOne(sel, this);
      }
    },
    querySelectorAll: {
      value(sel) {
        if (sel === ":root") {
          return this;
        }
        return selectAll(sel, this);
      }
    }
  });
}
var selectorTokensCache = /* @__PURE__ */ new Map();
function cachedQuerySelector(sel, node2) {
  let selectorTokens = selectorTokensCache.get(sel);
  if (selectorTokens === void 0) {
    selectorTokens = parseRelevantSelectors(sel);
    selectorTokensCache.set(sel, selectorTokens);
  }
  if (selectorTokens) {
    for (const token of selectorTokens) {
      if (token.name === "class") {
        return classCache.has(token.value);
      }
      if (token.name === "id") {
        return idCache.has(token.value);
      }
    }
  }
  return !!selectOne(sel, node2);
}
function parseRelevantSelectors(sel) {
  const tokens = parse$1(sel);
  const relevantTokens = [];
  for (let i = 0; i < tokens.length; i++) {
    const tokenGroup = tokens[i];
    if (tokenGroup?.length !== 1) {
      continue;
    }
    const token = tokenGroup[0];
    if (token?.type === "attribute" && (token.name === "class" || token.name === "id")) {
      relevantTokens.push(token);
    }
  }
  return relevantTokens.length > 0 ? relevantTokens : null;
}
var LOG_LEVELS = ["trace", "debug", "info", "warn", "error", "silent"];
var defaultLogger = {
  trace(msg) {
    console.trace(msg);
  },
  debug(msg) {
    console.debug(msg);
  },
  warn(msg) {
    console.warn(pc.yellow(msg));
  },
  error(msg) {
    console.error(pc.bold(pc.red(msg)));
  },
  info(msg) {
    console.info(pc.bold(pc.blue(msg)));
  },
  silent() {
  }
};
function createLogger(logLevel) {
  const logLevelIdx = LOG_LEVELS.indexOf(logLevel);
  return LOG_LEVELS.reduce((logger, type, index) => {
    if (index >= logLevelIdx) {
      logger[type] = defaultLogger[type];
    } else {
      logger[type] = defaultLogger.silent;
    }
    return logger;
  }, {});
}
function isSubpath(basePath, currentPath) {
  return !_pathModule.relative(basePath, currentPath).startsWith("..");
}
var removePseudoClassesAndElementsPattern = /(?<!\\)::?[a-z-]+(?:\(.+\))?/gi;
var doubleNestingPattern = />\s*(?=>|$)/g;
var removeTrailingCommasPattern = /\(\s*,|,\s*\)/g;
var Beasties = class {
  #selectorCache = /* @__PURE__ */ new Map();
  options;
  logger;
  fs;
  constructor(options = {}) {
    this.options = Object.assign({
      logLevel: "info",
      path: "",
      publicPath: "",
      reduceInlineStyles: true,
      pruneSource: false,
      additionalStylesheets: [],
      allowRules: []
    }, options);
    this.logger = this.options.logger || createLogger(this.options.logLevel);
  }
  /**
   * Read the contents of a file from the specified filesystem or disk
   */
  readFile(filename) {
    const fs = this.fs;
    return new Promise((resolve2, reject) => {
      const callback = (err, data) => {
        if (err) reject(err);
        else resolve2(data.toString());
      };
      if (fs && fs.readFile) {
        fs.readFile(filename, callback);
      } else {
        readFile(filename, "utf-8", callback);
      }
    });
  }
  /**
   * Apply critical CSS processing to the html
   */
  process(html) {
    return __async(this, null, function* () {
      const start = Date.now();
      const document2 = createDocument(html);
      if (this.options.additionalStylesheets.length > 0) {
        yield this.embedAdditionalStylesheet(document2);
      }
      if (this.options.external !== false) {
        const externalSheets = [...document2.querySelectorAll('link[rel="stylesheet"]')];
        yield Promise.all(externalSheets.map((link2) => this.embedLinkedStylesheet(link2, document2)));
      }
      const styles = this.getAffectedStyleTags(document2);
      for (const style of styles) {
        this.processStyle(style, document2);
      }
      if (this.options.mergeStylesheets !== false && styles.length !== 0) {
        this.mergeStylesheets(document2);
      }
      const output = serializeDocument(document2);
      const end = Date.now();
      this.logger.info?.(`Time ${end - start}ms`);
      return output;
    });
  }
  /**
   * Get the style tags that need processing
   */
  getAffectedStyleTags(document2) {
    const styles = [...document2.querySelectorAll("style")];
    if (this.options.reduceInlineStyles === false) {
      return styles.filter((style) => style.$$external);
    }
    return styles;
  }
  mergeStylesheets(document2) {
    const styles = this.getAffectedStyleTags(document2);
    if (styles.length === 0) {
      this.logger.warn?.("Merging inline stylesheets into a single <style> tag skipped, no inline stylesheets to merge");
      return;
    }
    const first2 = styles[0];
    let sheet = first2.textContent;
    for (let i = 1; i < styles.length; i++) {
      const node2 = styles[i];
      sheet += node2.textContent;
      node2.remove();
    }
    first2.textContent = sheet;
  }
  /**
   * Given href, find the corresponding CSS asset
   */
  getCssAsset(href, _style) {
    return __async(this, null, function* () {
      const outputPath = this.options.path;
      const publicPath = this.options.publicPath;
      let normalizedPath = href.replace(/^\//, "");
      const pathPrefix = `${(publicPath || "").replace(/(^\/|\/$)/g, "")}/`;
      if (normalizedPath.startsWith(pathPrefix)) {
        normalizedPath = normalizedPath.substring(pathPrefix.length).replace(/^\//, "");
      }
      if (/^https?:\/\//.test(normalizedPath) || href.startsWith("//")) {
        return void 0;
      }
      const filename = _pathModule.resolve(outputPath, normalizedPath);
      if (!isSubpath(outputPath, filename)) {
        return void 0;
      }
      let sheet;
      try {
        sheet = yield this.readFile(filename);
      } catch {
        this.logger.warn?.(`Unable to locate stylesheet: ${filename}`);
      }
      return sheet;
    });
  }
  checkInlineThreshold(link2, style, sheet) {
    if (this.options.inlineThreshold && sheet.length < this.options.inlineThreshold) {
      const href = style.$$name;
      style.$$reduce = false;
      this.logger.info?.(`\x1B[32mInlined all of ${href} (${sheet.length} was below the threshold of ${this.options.inlineThreshold})\x1B[39m`);
      link2.remove();
      return true;
    }
    return false;
  }
  /**
   * Inline the stylesheets from options.additionalStylesheets (assuming it passes `options.filter`)
   */
  embedAdditionalStylesheet(document2) {
    return __async(this, null, function* () {
      const styleSheetsIncluded = [];
      const sources = yield Promise.all(this.options.additionalStylesheets.map((cssFile) => {
        if (styleSheetsIncluded.includes(cssFile)) {
          return [];
        }
        styleSheetsIncluded.push(cssFile);
        const style = document2.createElement("style");
        style.$$external = true;
        return this.getCssAsset(cssFile, style).then((sheet) => [sheet, style]);
      }));
      for (const [sheet, style] of sources) {
        if (sheet) {
          style.textContent = sheet;
          document2.head.appendChild(style);
        }
      }
    });
  }
  /**
   * Inline the target stylesheet referred to by a <link rel="stylesheet"> (assuming it passes `options.filter`)
   */
  embedLinkedStylesheet(link2, document2) {
    return __async(this, null, function* () {
      const href = link2.getAttribute("href");
      if (!href?.endsWith(".css")) {
        return void 0;
      }
      const style = document2.createElement("style");
      style.$$external = true;
      const sheet = yield this.getCssAsset(href, style);
      if (!sheet) {
        return;
      }
      style.textContent = sheet;
      style.$$name = href;
      style.$$links = [link2];
      link2.parentNode?.insertBefore(style, link2);
      if (this.checkInlineThreshold(link2, style, sheet)) {
        return;
      }
      let media = link2.getAttribute("media");
      if (media && !validateMediaQuery(media)) {
        media = void 0;
      }
      const preloadMode = this.options.preload;
      let cssLoaderPreamble = "function $loadcss(u,m,l){(l=document.createElement('link')).rel='stylesheet';l.href=u;document.head.appendChild(l)}";
      const lazy = preloadMode === "js-lazy";
      if (lazy) {
        cssLoaderPreamble = cssLoaderPreamble.replace("l.href", "l.media='print';l.onload=function(){l.media=m};l.href");
      }
      if (preloadMode === false) return;
      let noscriptFallback = false;
      let updateLinkToPreload = false;
      const noscriptLink = link2.cloneNode(false);
      if (preloadMode === "body") {
        document2.body.appendChild(link2);
      } else {
        if (preloadMode === "js" || preloadMode === "js-lazy") {
          const script = document2.createElement("script");
          script.setAttribute("data-href", href);
          script.setAttribute("data-media", media || "all");
          const js = `${cssLoaderPreamble}$loadcss(document.currentScript.dataset.href,document.currentScript.dataset.media)`;
          script.textContent = js;
          link2.parentNode.insertBefore(script, link2.nextSibling);
          style.$$links.push(script);
          cssLoaderPreamble = "";
          noscriptFallback = true;
          updateLinkToPreload = true;
        } else if (preloadMode === "media") {
          link2.setAttribute("media", "print");
          link2.setAttribute("onload", `this.media='${media || "all"}'`);
          noscriptFallback = true;
        } else if (preloadMode === "swap-high") {
          link2.setAttribute("rel", "alternate stylesheet preload");
          link2.setAttribute("title", "styles");
          link2.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
          noscriptFallback = true;
        } else if (preloadMode === "swap-low") {
          link2.setAttribute("rel", "alternate stylesheet");
          link2.setAttribute("title", "styles");
          link2.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
          noscriptFallback = true;
        } else if (preloadMode === "swap") {
          link2.setAttribute("onload", "this.rel='stylesheet'");
          updateLinkToPreload = true;
          noscriptFallback = true;
        } else {
          const bodyLink = link2.cloneNode(false);
          bodyLink.removeAttribute("id");
          document2.body.appendChild(bodyLink);
          style.$$links.push(bodyLink);
          updateLinkToPreload = true;
        }
      }
      if (this.options.noscriptFallback !== false && noscriptFallback && !href.includes("</noscript>")) {
        const noscript = document2.createElement("noscript");
        noscriptLink.removeAttribute("id");
        noscript.appendChild(noscriptLink);
        link2.parentNode.insertBefore(noscript, link2.nextSibling);
        style.$$links.push(noscript);
      }
      if (updateLinkToPreload) {
        link2.setAttribute("rel", "preload");
        link2.setAttribute("as", "style");
      }
    });
  }
  /**
   * Prune the source CSS files
   */
  pruneSource(style, before, sheetInverse) {
    const minSize = this.options.minimumExternalSize;
    const name = style.$$name;
    const shouldInline = minSize && sheetInverse.length < minSize;
    if (shouldInline) {
      this.logger.info?.(`\x1B[32mInlined all of ${name} (non-critical external stylesheet would have been ${sheetInverse.length}b, which was below the threshold of ${minSize})\x1B[39m`);
    }
    if (shouldInline || !sheetInverse) {
      style.textContent = before;
      if (style.$$links) {
        for (const link2 of style.$$links) {
          const parent = link2.parentNode;
          parent?.removeChild(link2);
        }
      }
    }
    return !!shouldInline;
  }
  /**
   * Parse the stylesheet within a <style> element, then reduce it to contain only rules used by the document.
   */
  processStyle(style, document2) {
    if (style.$$reduce === false) return;
    const name = style.$$name ? style.$$name.replace(/^\//, "") : "inline CSS";
    const options = this.options;
    const beastiesContainer = document2.beastiesContainer;
    let keyframesMode = options.keyframes ?? "critical";
    if (keyframesMode === true) keyframesMode = "all";
    if (keyframesMode === false) keyframesMode = "none";
    let sheet = style.textContent;
    const before = sheet;
    if (!sheet) return;
    const ast = parseStylesheet(sheet);
    const astInverse = options.pruneSource ? parseStylesheet(sheet) : null;
    let criticalFonts = "";
    const failedSelectors = [];
    const criticalKeyframeNames = /* @__PURE__ */ new Set();
    let includeNext = false;
    let includeAll = false;
    let excludeNext = false;
    let excludeAll = false;
    const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
    const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
    walkStyleRules(ast, markOnly((rule2) => {
      if (rule2.type === "comment") {
        const beastiesComment = rule2.text.match(/^(?<!! )beasties:(.*)/);
        const command = beastiesComment && beastiesComment[1];
        if (command) {
          switch (command) {
            case "include":
              includeNext = true;
              break;
            case "exclude":
              excludeNext = true;
              break;
            case "include start":
              includeAll = true;
              break;
            case "include end":
              includeAll = false;
              break;
            case "exclude start":
              excludeAll = true;
              break;
            case "exclude end":
              excludeAll = false;
              break;
          }
        }
      }
      if (rule2.type === "rule") {
        if (includeNext) {
          includeNext = false;
          return true;
        }
        if (excludeNext) {
          excludeNext = false;
          return false;
        }
        if (includeAll) {
          return true;
        }
        if (excludeAll) {
          return false;
        }
        rule2.filterSelectors?.((sel) => {
          const isAllowedRule = options.allowRules.some((exp) => {
            if (exp instanceof RegExp) {
              return exp.test(sel);
            }
            return exp === sel;
          });
          if (isAllowedRule) return true;
          if (sel === ":root" || sel === "html" || sel === "body" || sel[0] === ":" && /^::?(?:before|after)$/.test(sel)) {
            return true;
          }
          sel = this.normalizeCssSelector(sel);
          if (!sel) return false;
          try {
            return beastiesContainer.exists(sel);
          } catch (e) {
            failedSelectors.push(`${sel} -> ${e.message || e.toString()}`);
            return false;
          }
        });
        if (!rule2.selector) {
          return false;
        }
        if (rule2.nodes) {
          for (const decl of rule2.nodes) {
            if (!("prop" in decl)) {
              continue;
            }
            if (shouldInlineFonts && /\bfont(?:-family)?\b/i.test(decl.prop)) {
              criticalFonts += ` ${decl.value}`;
            }
            if (decl.prop === "animation" || decl.prop === "animation-name") {
              for (const name2 of decl.value.split(/\s+/)) {
                const nameTrimmed = name2.trim();
                if (nameTrimmed) criticalKeyframeNames.add(nameTrimmed);
              }
            }
          }
        }
      }
      if (rule2.type === "atrule" && (rule2.name === "font-face" || rule2.name === "layer")) return;
      const hasRemainingRules = ("nodes" in rule2 && rule2.nodes?.some((rule22) => !rule22.$$remove)) ?? true;
      return hasRemainingRules;
    }));
    if (failedSelectors.length !== 0) {
      this.logger.warn?.(`${failedSelectors.length} rules skipped due to selector errors:
  ${failedSelectors.join("\n  ")}`);
    }
    const preloadedFonts = /* @__PURE__ */ new Set();
    walkStyleRulesWithReverseMirror(ast, astInverse, (rule2) => {
      if (rule2.$$remove === true) return false;
      if ("selectors" in rule2) {
        applyMarkedSelectors(rule2);
      }
      if (rule2.type === "atrule" && rule2.name === "keyframes") {
        if (keyframesMode === "none") return false;
        if (keyframesMode === "all") return true;
        return criticalKeyframeNames.has(rule2.params);
      }
      if (rule2.type === "atrule" && rule2.name === "font-face") {
        let family, src;
        if (rule2.nodes) {
          for (const decl of rule2.nodes) {
            if (!("prop" in decl)) {
              continue;
            }
            if (decl.prop === "src") {
              src = (decl.value.match(/url\s*\(\s*(['"]?)(.+?)\1\s*\)/) || [])[2];
            } else if (decl.prop === "font-family") {
              family = decl.value;
            }
          }
          if (src && shouldPreloadFonts && !preloadedFonts.has(src)) {
            preloadedFonts.add(src);
            const preload = document2.createElement("link");
            preload.setAttribute("rel", "preload");
            preload.setAttribute("as", "font");
            preload.setAttribute("crossorigin", "anonymous");
            preload.setAttribute("href", src.trim());
            document2.head.appendChild(preload);
          }
        }
        if (!shouldInlineFonts || !family || !src || !criticalFonts.includes(family)) {
          return false;
        }
      }
    });
    sheet = serializeStylesheet(ast, {
      compress: this.options.compress !== false
    });
    if (sheet.trim().length === 0) {
      if (style.parentNode) {
        style.remove();
      }
      return;
    }
    let afterText = "";
    let styleInlinedCompletely = false;
    if (options.pruneSource) {
      const sheetInverse = serializeStylesheet(astInverse, {
        compress: this.options.compress !== false
      });
      styleInlinedCompletely = this.pruneSource(style, before, sheetInverse);
      if (styleInlinedCompletely) {
        const percent2 = sheetInverse.length / before.length * 100;
        afterText = `, reducing non-inlined size ${percent2 | 0}% to ${formatSize(sheetInverse.length)}`;
      }
    }
    if (!styleInlinedCompletely) {
      style.textContent = sheet;
    }
    const percent = sheet.length / before.length * 100 | 0;
    this.logger.info?.(`\x1B[32mInlined ${formatSize(sheet.length)} (${percent}% of original ${formatSize(before.length)}) of ${name}${afterText}.\x1B[39m`);
  }
  normalizeCssSelector(sel) {
    let normalizedSelector = this.#selectorCache.get(sel);
    if (normalizedSelector !== void 0) {
      return normalizedSelector;
    }
    normalizedSelector = sel.replace(removePseudoClassesAndElementsPattern, "").replace(removeTrailingCommasPattern, (match2) => match2.includes("(") ? "(" : ")").replace(doubleNestingPattern, "> *").trim();
    this.#selectorCache.set(sel, normalizedSelector);
    return normalizedSelector;
  }
};
function formatSize(size) {
  if (size <= 0) {
    return "0 bytes";
  }
  const abbreviations = ["bytes", "kB", "MB", "GB"];
  const index = Math.floor(Math.log(size) / Math.log(1024));
  const roundedSize = size / 1024 ** index;
  const fractionDigits = index === 0 ? 0 : 2;
  return `${roundedSize.toFixed(fractionDigits)} ${abbreviations[index]}`;
}

// node_modules/@angular/ssr/fesm2022/ssr.mjs
var ServerAssets = class {
  manifest;
  /**
   * Creates an instance of ServerAsset.
   *
   * @param manifest - The manifest containing the server assets.
   */
  constructor(manifest) {
    this.manifest = manifest;
  }
  /**
   * Retrieves the content of a server-side asset using its path.
   *
   * @param path - The path to the server asset within the manifest.
   * @returns The server asset associated with the provided path, as a `ServerAsset` object.
   * @throws Error - Throws an error if the asset does not exist.
   */
  getServerAsset(path2) {
    const asset = this.manifest.assets[path2];
    if (!asset) {
      throw new Error(`Server asset '${path2}' does not exist.`);
    }
    return asset;
  }
  /**
   * Checks if a specific server-side asset exists.
   *
   * @param path - The path to the server asset.
   * @returns A boolean indicating whether the asset exists.
   */
  hasServerAsset(path2) {
    return !!this.manifest.assets[path2];
  }
  /**
   * Retrieves the asset for 'index.server.html'.
   *
   * @returns The `ServerAsset` object for 'index.server.html'.
   * @throws Error - Throws an error if 'index.server.html' does not exist.
   */
  getIndexServerHtml() {
    return this.getServerAsset("index.server.html");
  }
};
var IGNORED_LOGS = /* @__PURE__ */ new Set(["Angular is running in development mode."]);
var Console2 = class extends Console {
  /**
   * Logs a message to the console if it is not in the set of ignored messages.
   *
   * @param message - The message to log to the console.
   *
   * This method overrides the `log` method of the `ɵConsole` class. It checks if the
   * message is in the `IGNORED_LOGS` set. If it is not, it delegates the logging to
   * the parent class's `log` method. Otherwise, the message is suppressed.
   */
  log(message) {
    if (!IGNORED_LOGS.has(message)) {
      super.log(message);
    }
  }
};
var angularAppManifest;
function setAngularAppManifest(manifest) {
  angularAppManifest = manifest;
}
function getAngularAppManifest() {
  if (!angularAppManifest) {
    throw new Error(`Angular app manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.`);
  }
  return angularAppManifest;
}
var angularAppEngineManifest;
function setAngularAppEngineManifest(manifest) {
  angularAppEngineManifest = manifest;
}
function getAngularAppEngineManifest() {
  if (!angularAppEngineManifest) {
    throw new Error(`Angular app engine manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.`);
  }
  return angularAppEngineManifest;
}
function stripLeadingSlash(url) {
  return url.length > 1 && url[0] === "/" ? url.slice(1) : url;
}
function addLeadingSlash(url) {
  return url[0] === "/" ? url : `/${url}`;
}
function addTrailingSlash(url) {
  return url[url.length - 1] === "/" ? url : `${url}/`;
}
function joinUrlParts(...parts) {
  const normalizeParts = [];
  for (const part of parts) {
    if (part === "") {
      continue;
    }
    let normalizedPart = part;
    if (part[0] === "/") {
      normalizedPart = normalizedPart.slice(1);
    }
    if (part[part.length - 1] === "/") {
      normalizedPart = normalizedPart.slice(0, -1);
    }
    if (normalizedPart !== "") {
      normalizeParts.push(normalizedPart);
    }
  }
  return addLeadingSlash(normalizeParts.join("/"));
}
function stripIndexHtmlFromURL(url) {
  if (url.pathname.endsWith("/index.html")) {
    const modifiedURL = new URL(url);
    modifiedURL.pathname = modifiedURL.pathname.slice(
      0,
      /** '/index.html'.length */
      -11
    );
    return modifiedURL;
  }
  return url;
}
function buildPathWithParams(toPath, fromPath) {
  if (toPath[0] !== "/") {
    throw new Error(`Invalid toPath: The string must start with a '/'. Received: '${toPath}'`);
  }
  if (fromPath[0] !== "/") {
    throw new Error(`Invalid fromPath: The string must start with a '/'. Received: '${fromPath}'`);
  }
  if (!toPath.includes("/*")) {
    return toPath;
  }
  const fromPathParts = fromPath.split("/");
  const toPathParts = toPath.split("/");
  const resolvedParts = toPathParts.map((part, index) => toPathParts[index] === "*" ? fromPathParts[index] : part);
  return joinUrlParts(...resolvedParts);
}
function renderAngular(html, bootstrap, url, platformProviders, serverContext) {
  const providers = [{
    provide: SERVER_CONTEXT,
    useValue: serverContext
  }, {
    // An Angular Console Provider that does not print a set of predefined logs.
    provide: Console,
    // Using `useClass` would necessitate decorating `Console` with `@Injectable`,
    // which would require switching from `ts_library` to `ng_module`. This change
    // would also necessitate various patches of `@angular/bazel` to support ESM.
    useFactory: () => new Console2()
  }, ...platformProviders];
  const urlToRender = stripIndexHtmlFromURL(url).toString();
  return isNgModule2(bootstrap) ? renderModule(bootstrap, {
    url: urlToRender,
    document: html,
    extraProviders: providers
  }) : renderApplication(bootstrap, {
    url: urlToRender,
    document: html,
    platformProviders: providers
  });
}
function isNgModule2(value) {
  return "ɵmod" in value;
}
function promiseWithAbort(promise, signal, errorMessagePrefix) {
  return new Promise((resolve2, reject) => {
    const abortHandler = () => {
      reject(new DOMException(`${errorMessagePrefix} was aborted.
${signal.reason}`, "AbortError"));
    };
    if (signal.aborted) {
      abortHandler();
      return;
    }
    signal.addEventListener("abort", abortHandler, {
      once: true
    });
    promise.then(resolve2).catch(reject).finally(() => {
      signal.removeEventListener("abort", abortHandler);
    });
  });
}
var APP_SHELL_ROUTE = "ng-app-shell";
var ServerRoutesFeatureKind;
(function(ServerRoutesFeatureKind2) {
  ServerRoutesFeatureKind2[ServerRoutesFeatureKind2["AppShell"] = 0] = "AppShell";
})(ServerRoutesFeatureKind || (ServerRoutesFeatureKind = {}));
var RenderMode;
(function(RenderMode2) {
  RenderMode2[RenderMode2["Server"] = 0] = "Server";
  RenderMode2[RenderMode2["Client"] = 1] = "Client";
  RenderMode2[RenderMode2["Prerender"] = 2] = "Prerender";
})(RenderMode || (RenderMode = {}));
var PrerenderFallback;
(function(PrerenderFallback2) {
  PrerenderFallback2[PrerenderFallback2["Server"] = 0] = "Server";
  PrerenderFallback2[PrerenderFallback2["Client"] = 1] = "Client";
  PrerenderFallback2[PrerenderFallback2["None"] = 2] = "None";
})(PrerenderFallback || (PrerenderFallback = {}));
var SERVER_ROUTES_CONFIG = new InjectionToken("SERVER_ROUTES_CONFIG");
function provideServerRoutesConfig(routes, options) {
  if (false) {
    throw new Error(`The 'provideServerRoutesConfig' function should not be invoked within the browser portion of the application.`);
  }
  return makeEnvironmentProviders([{
    provide: SERVER_ROUTES_CONFIG,
    useValue: __spreadValues({
      routes
    }, options)
  }]);
}
function provideServerRouting(routes, ...features) {
  const config = {
    routes
  };
  const hasAppShell = features.some((f) => f.ɵkind === ServerRoutesFeatureKind.AppShell);
  if (hasAppShell) {
    config.appShellRoute = APP_SHELL_ROUTE;
  }
  const providers = [{
    provide: SERVER_ROUTES_CONFIG,
    useValue: config
  }];
  for (const feature of features) {
    providers.push(...feature.ɵproviders);
  }
  return makeEnvironmentProviders(providers);
}
function withAppShell(component) {
  const routeConfig = {
    path: APP_SHELL_ROUTE
  };
  if ("ɵcmp" in component) {
    routeConfig.component = component;
  } else {
    routeConfig.loadComponent = component;
  }
  return {
    ɵkind: ServerRoutesFeatureKind.AppShell,
    ɵproviders: [{
      provide: ROUTES,
      useValue: routeConfig,
      multi: true
    }]
  };
}
var RouteTree = class _RouteTree {
  /**
   * The root node of the route tree.
   * All routes are stored and accessed relative to this root node.
   */
  root = this.createEmptyRouteTreeNode();
  /**
   * Inserts a new route into the route tree.
   * The route is broken down into segments, and each segment is added to the tree.
   * Parameterized segments (e.g., :id) are normalized to wildcards (*) for matching purposes.
   *
   * @param route - The route path to insert into the tree.
   * @param metadata - Metadata associated with the route, excluding the route path itself.
   */
  insert(route, metadata) {
    let node2 = this.root;
    const segments = this.getPathSegments(route);
    const normalizedSegments = [];
    for (const segment of segments) {
      const normalizedSegment = segment[0] === ":" ? "*" : segment;
      let childNode = node2.children.get(normalizedSegment);
      if (!childNode) {
        childNode = this.createEmptyRouteTreeNode();
        node2.children.set(normalizedSegment, childNode);
      }
      node2 = childNode;
      normalizedSegments.push(normalizedSegment);
    }
    node2.metadata = __spreadProps(__spreadValues({}, metadata), {
      route: addLeadingSlash(normalizedSegments.join("/"))
    });
  }
  /**
   * Matches a given route against the route tree and returns the best matching route's metadata.
   * The best match is determined by the lowest insertion index, meaning the earliest defined route
   * takes precedence.
   *
   * @param route - The route path to match against the route tree.
   * @returns The metadata of the best matching route or `undefined` if no match is found.
   */
  match(route) {
    const segments = this.getPathSegments(route);
    return this.traverseBySegments(segments)?.metadata;
  }
  /**
   * Converts the route tree into a serialized format representation.
   * This method converts the route tree into an array of metadata objects that describe the structure of the tree.
   * The array represents the routes in a nested manner where each entry includes the route and its associated metadata.
   *
   * @returns An array of `RouteTreeNodeMetadata` objects representing the route tree structure.
   *          Each object includes the `route` and associated metadata of a route.
   */
  toObject() {
    return Array.from(this.traverse());
  }
  /**
   * Constructs a `RouteTree` from an object representation.
   * This method is used to recreate a `RouteTree` instance from an array of metadata objects.
   * The array should be in the format produced by `toObject`, allowing for the reconstruction of the route tree
   * with the same routes and metadata.
   *
   * @param value - An array of `RouteTreeNodeMetadata` objects that represent the serialized format of the route tree.
   *                Each object should include a `route` and its associated metadata.
   * @returns A new `RouteTree` instance constructed from the provided metadata objects.
   */
  static fromObject(value) {
    const tree2 = new _RouteTree();
    for (const _a2 of value) {
      const _b = _a2, {
        route
      } = _b, metadata = __objRest(_b, [
        "route"
      ]);
      tree2.insert(route, metadata);
    }
    return tree2;
  }
  /**
   * A generator function that recursively traverses the route tree and yields the metadata of each node.
   * This allows for easy and efficient iteration over all nodes in the tree.
   *
   * @param node - The current node to start the traversal from. Defaults to the root node of the tree.
   */
  *traverse(node2 = this.root) {
    if (node2.metadata) {
      yield node2.metadata;
    }
    for (const childNode of node2.children.values()) {
      yield* __yieldStar(this.traverse(childNode));
    }
  }
  /**
   * Extracts the path segments from a given route string.
   *
   * @param route - The route string from which to extract segments.
   * @returns An array of path segments.
   */
  getPathSegments(route) {
    return route.split("/").filter(Boolean);
  }
  /**
   * Recursively traverses the route tree from a given node, attempting to match the remaining route segments.
   * If the node is a leaf node (no more segments to match) and contains metadata, the node is yielded.
   *
   * This function prioritizes exact segment matches first, followed by wildcard matches (`*`),
   * and finally deep wildcard matches (`**`) that consume all segments.
   *
   * @param segments - The array of route path segments to match against the route tree.
   * @param node - The current node in the route tree to start traversal from. Defaults to the root node.
   * @param currentIndex - The index of the segment in `remainingSegments` currently being matched.
   * Defaults to `0` (the first segment).
   *
   * @returns The node that best matches the remaining segments or `undefined` if no match is found.
   */
  traverseBySegments(segments, node2 = this.root, currentIndex = 0) {
    if (currentIndex >= segments.length) {
      return node2.metadata ? node2 : node2.children.get("**");
    }
    if (!node2.children.size) {
      return void 0;
    }
    const segment = segments[currentIndex];
    const exactMatch = node2.children.get(segment);
    if (exactMatch) {
      const match2 = this.traverseBySegments(segments, exactMatch, currentIndex + 1);
      if (match2) {
        return match2;
      }
    }
    const wildcardMatch = node2.children.get("*");
    if (wildcardMatch) {
      const match2 = this.traverseBySegments(segments, wildcardMatch, currentIndex + 1);
      if (match2) {
        return match2;
      }
    }
    return node2.children.get("**");
  }
  /**
   * Creates an empty route tree node.
   * This helper function is used during the tree construction.
   *
   * @returns A new, empty route tree node.
   */
  createEmptyRouteTreeNode() {
    return {
      children: /* @__PURE__ */ new Map()
    };
  }
};
var MODULE_PRELOAD_MAX = 10;
var URL_PARAMETER_REGEXP = /(?<!\\):([^/]+)/g;
var VALID_REDIRECT_RESPONSE_CODES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function handleRoute(options) {
  return __asyncGenerator(this, null, function* () {
    try {
      const {
        metadata,
        currentRoutePath,
        route,
        compiler,
        parentInjector,
        serverConfigRouteTree,
        entryPointToBrowserMapping,
        invokeGetPrerenderParams,
        includePrerenderFallbackRoutes
      } = options;
      const {
        redirectTo,
        loadChildren: loadChildren2,
        loadComponent,
        children,
        ɵentryName
      } = route;
      if (ɵentryName && loadComponent) {
        appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata, true);
      }
      if (metadata.renderMode === RenderMode.Prerender) {
        yield* __yieldStar(handleSSGRoute(serverConfigRouteTree, typeof redirectTo === "string" ? redirectTo : void 0, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes));
      } else if (typeof redirectTo === "string") {
        if (metadata.status && !VALID_REDIRECT_RESPONSE_CODES.has(metadata.status)) {
          yield {
            error: `The '${metadata.status}' status code is not a valid redirect response code. Please use one of the following redirect response codes: ${[...VALID_REDIRECT_RESPONSE_CODES.values()].join(", ")}.`
          };
        } else {
          yield __spreadProps(__spreadValues({}, metadata), {
            redirectTo: resolveRedirectTo(metadata.route, redirectTo)
          });
        }
      } else {
        yield metadata;
      }
      if (children?.length) {
        yield* __yieldStar(traverseRoutesConfig(__spreadProps(__spreadValues({}, options), {
          routes: children,
          parentRoute: currentRoutePath,
          parentPreloads: metadata.preload
        })));
      }
      if (loadChildren2) {
        if (ɵentryName) {
          appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata, false);
        }
        const loadedChildRoutes = yield new __await(loadChildren(route, compiler, parentInjector).toPromise());
        if (loadedChildRoutes) {
          const {
            routes: childRoutes,
            injector = parentInjector
          } = loadedChildRoutes;
          yield* __yieldStar(traverseRoutesConfig(__spreadProps(__spreadValues({}, options), {
            routes: childRoutes,
            parentInjector: injector,
            parentRoute: currentRoutePath,
            parentPreloads: metadata.preload
          })));
        }
      }
    } catch (error) {
      yield {
        error: `Error in handleRoute for '${options.currentRoutePath}': ${error.message}`
      };
    }
  });
}
function traverseRoutesConfig(options) {
  return __asyncGenerator(this, null, function* () {
    const {
      routes: routeConfigs,
      parentPreloads,
      parentRoute,
      serverConfigRouteTree
    } = options;
    for (const route of routeConfigs) {
      const {
        matcher,
        path: path2 = matcher ? "**" : ""
      } = route;
      const currentRoutePath = joinUrlParts(parentRoute, path2);
      if (matcher && serverConfigRouteTree) {
        let foundMatch = false;
        for (const matchedMetaData2 of serverConfigRouteTree.traverse()) {
          if (!matchedMetaData2.route.startsWith(currentRoutePath)) {
            continue;
          }
          foundMatch = true;
          matchedMetaData2.presentInClientRouter = true;
          if (matchedMetaData2.renderMode === RenderMode.Prerender) {
            yield {
              error: `The route '${stripLeadingSlash(currentRoutePath)}' is set for prerendering but has a defined matcher. Routes with matchers cannot use prerendering. Please specify a different 'renderMode'.`
            };
            continue;
          }
          yield* __yieldStar(handleRoute(__spreadProps(__spreadValues({}, options), {
            currentRoutePath,
            route,
            metadata: __spreadProps(__spreadValues({}, matchedMetaData2), {
              preload: parentPreloads,
              route: matchedMetaData2.route,
              presentInClientRouter: void 0
            })
          })));
        }
        if (!foundMatch) {
          yield {
            error: `The route '${stripLeadingSlash(currentRoutePath)}' has a defined matcher but does not match any route in the server routing configuration. Please ensure this route is added to the server routing configuration.`
          };
        }
        continue;
      }
      let matchedMetaData;
      if (serverConfigRouteTree) {
        matchedMetaData = serverConfigRouteTree.match(currentRoutePath);
        if (!matchedMetaData) {
          yield {
            error: `The '${stripLeadingSlash(currentRoutePath)}' route does not match any route defined in the server routing configuration. Please ensure this route is added to the server routing configuration.`
          };
          continue;
        }
        matchedMetaData.presentInClientRouter = true;
      }
      yield* __yieldStar(handleRoute(__spreadProps(__spreadValues({}, options), {
        metadata: __spreadProps(__spreadValues({
          renderMode: RenderMode.Prerender
        }, matchedMetaData), {
          preload: parentPreloads,
          // Match Angular router behavior
          // ['one', 'two', ''] -> 'one/two/'
          // ['one', 'two', 'three'] -> 'one/two/three'
          route: path2 === "" ? addTrailingSlash(currentRoutePath) : currentRoutePath,
          presentInClientRouter: void 0
        }),
        currentRoutePath,
        route
      })));
    }
  });
}
function appendPreloadToMetadata(entryName, entryPointToBrowserMapping, metadata, includeDynamicImports) {
  const existingPreloads = metadata.preload ?? [];
  if (!entryPointToBrowserMapping || existingPreloads.length >= MODULE_PRELOAD_MAX) {
    return;
  }
  const preload = entryPointToBrowserMapping[entryName];
  if (!preload?.length) {
    return;
  }
  const combinedPreloads = new Set(existingPreloads);
  for (const {
    dynamicImport,
    path: path2
  } of preload) {
    if (dynamicImport && !includeDynamicImports) {
      continue;
    }
    combinedPreloads.add(path2);
    if (combinedPreloads.size === MODULE_PRELOAD_MAX) {
      break;
    }
  }
  metadata.preload = Array.from(combinedPreloads);
}
function handleSSGRoute(serverConfigRouteTree, redirectTo, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes) {
  return __asyncGenerator(this, null, function* () {
    if (metadata.renderMode !== RenderMode.Prerender) {
      throw new Error(`'handleSSGRoute' was called for a route which rendering mode is not prerender.`);
    }
    const _a2 = metadata, {
      route: currentRoutePath,
      fallback
    } = _a2, meta = __objRest(_a2, [
      "route",
      "fallback"
    ]);
    const getPrerenderParams = "getPrerenderParams" in meta ? meta.getPrerenderParams : void 0;
    if ("getPrerenderParams" in meta) {
      delete meta["getPrerenderParams"];
    }
    if (redirectTo !== void 0) {
      meta.redirectTo = resolveRedirectTo(currentRoutePath, redirectTo);
    }
    if (!URL_PARAMETER_REGEXP.test(currentRoutePath)) {
      yield __spreadProps(__spreadValues({}, meta), {
        route: currentRoutePath
      });
      return;
    }
    if (invokeGetPrerenderParams) {
      if (!getPrerenderParams) {
        yield {
          error: `The '${stripLeadingSlash(currentRoutePath)}' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. Please define 'getPrerenderParams' function for this route in your server routing configuration or specify a different 'renderMode'.`
        };
        return;
      }
      if (serverConfigRouteTree) {
        const catchAllRoutePath = joinUrlParts(currentRoutePath, "**");
        const match2 = serverConfigRouteTree.match(catchAllRoutePath);
        if (match2 && match2.renderMode === RenderMode.Prerender && !("getPrerenderParams" in match2)) {
          serverConfigRouteTree.insert(catchAllRoutePath, __spreadProps(__spreadValues({}, match2), {
            presentInClientRouter: true,
            getPrerenderParams
          }));
        }
      }
      const parameters = yield new __await(runInInjectionContext(parentInjector, () => getPrerenderParams()));
      try {
        for (const params of parameters) {
          const routeWithResolvedParams = currentRoutePath.replace(URL_PARAMETER_REGEXP, (match2) => {
            const parameterName = match2.slice(1);
            const value = params[parameterName];
            if (typeof value !== "string") {
              throw new Error(`The 'getPrerenderParams' function defined for the '${stripLeadingSlash(currentRoutePath)}' route returned a non-string value for parameter '${parameterName}'. Please make sure the 'getPrerenderParams' function returns values for all parameters specified in this route.`);
            }
            return value;
          });
          yield __spreadProps(__spreadValues({}, meta), {
            route: routeWithResolvedParams,
            redirectTo: redirectTo === void 0 ? void 0 : resolveRedirectTo(routeWithResolvedParams, redirectTo)
          });
        }
      } catch (error) {
        yield {
          error: `${error.message}`
        };
        return;
      }
    }
    if (includePrerenderFallbackRoutes && (fallback !== PrerenderFallback.None || !invokeGetPrerenderParams)) {
      yield __spreadProps(__spreadValues({}, meta), {
        route: currentRoutePath,
        renderMode: fallback === PrerenderFallback.Client ? RenderMode.Client : RenderMode.Server
      });
    }
  });
}
function resolveRedirectTo(routePath, redirectTo) {
  if (redirectTo[0] === "/") {
    return redirectTo;
  }
  const segments = routePath.replace(URL_PARAMETER_REGEXP, "*").split("/");
  segments.pop();
  return joinUrlParts(...segments, redirectTo);
}
function buildServerConfigRouteTree({
  routes,
  appShellRoute
}) {
  const serverRoutes = [...routes];
  if (appShellRoute !== void 0) {
    serverRoutes.unshift({
      path: appShellRoute,
      renderMode: RenderMode.Prerender
    });
  }
  const serverConfigRouteTree = new RouteTree();
  const errors = [];
  for (const _a2 of serverRoutes) {
    const _b = _a2, {
      path: path2
    } = _b, metadata = __objRest(_b, [
      "path"
    ]);
    if (path2[0] === "/") {
      errors.push(`Invalid '${path2}' route configuration: the path cannot start with a slash.`);
      continue;
    }
    if (path2.includes("*") && "getPrerenderParams" in metadata) {
      errors.push(`Invalid '${path2}' route configuration: 'getPrerenderParams' cannot be used with a '*' or '**' route.`);
      continue;
    }
    serverConfigRouteTree.insert(path2, metadata);
  }
  return {
    serverConfigRouteTree,
    errors
  };
}
function getRoutesFromAngularRouterConfig(bootstrap, document2, url, invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, entryPointToBrowserMapping = void 0) {
  return __async(this, null, function* () {
    const {
      protocol,
      host
    } = url;
    const platformRef = platformServer([{
      provide: INITIAL_CONFIG,
      useValue: {
        document: document2,
        url: `${protocol}//${host}/`
      }
    }, {
      // An Angular Console Provider that does not print a set of predefined logs.
      provide: Console,
      // Using `useClass` would necessitate decorating `Console` with `@Injectable`,
      // which would require switching from `ts_library` to `ng_module`. This change
      // would also necessitate various patches of `@angular/bazel` to support ESM.
      useFactory: () => new Console2()
    }, {
      provide: ENABLE_ROOT_COMPONENT_BOOTSTRAP,
      useValue: false
    }]);
    try {
      let applicationRef;
      if (isNgModule2(bootstrap)) {
        const moduleRef = yield platformRef.bootstrapModule(bootstrap);
        applicationRef = moduleRef.injector.get(ApplicationRef);
      } else {
        applicationRef = yield bootstrap();
      }
      const injector = applicationRef.injector;
      const router = injector.get(Router);
      router.navigationTransitions.afterPreactivation()?.next?.();
      yield applicationRef.whenStable();
      const errors = [];
      const rawBaseHref = injector.get(APP_BASE_HREF, null, {
        optional: true
      }) ?? injector.get(PlatformLocation).getBaseHrefFromDOM();
      const {
        pathname: baseHref
      } = new URL(rawBaseHref, "http://localhost");
      const compiler = injector.get(Compiler);
      const serverRoutesConfig = injector.get(SERVER_ROUTES_CONFIG, null, {
        optional: true
      });
      let serverConfigRouteTree;
      if (serverRoutesConfig) {
        const result2 = buildServerConfigRouteTree(serverRoutesConfig);
        serverConfigRouteTree = result2.serverConfigRouteTree;
        errors.push(...result2.errors);
      }
      if (errors.length) {
        return {
          baseHref,
          routes: [],
          errors
        };
      }
      const routesResults = [];
      if (router.config.length) {
        const traverseRoutes = traverseRoutesConfig({
          routes: router.config,
          compiler,
          parentInjector: injector,
          parentRoute: "",
          serverConfigRouteTree,
          invokeGetPrerenderParams,
          includePrerenderFallbackRoutes,
          entryPointToBrowserMapping
        });
        const seenRoutes = /* @__PURE__ */ new Set();
        try {
          for (var iter = __forAwait(traverseRoutes), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
            const routeMetadata = temp.value;
            if ("error" in routeMetadata) {
              errors.push(routeMetadata.error);
              continue;
            }
            const routePath = routeMetadata.route;
            if (!seenRoutes.has(routePath)) {
              routesResults.push(routeMetadata);
              seenRoutes.add(routePath);
            }
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && (yield temp.call(iter));
          } finally {
            if (error)
              throw error[0];
          }
        }
        yield new Promise((resolve2) => setTimeout(resolve2, 0));
        if (serverConfigRouteTree) {
          for (const {
            route,
            presentInClientRouter
          } of serverConfigRouteTree.traverse()) {
            if (presentInClientRouter || route.endsWith("/**")) {
              continue;
            }
            errors.push(`The '${stripLeadingSlash(route)}' server route does not match any routes defined in the Angular routing configuration (typically provided as a part of the 'provideRouter' call). Please make sure that the mentioned server route is present in the Angular routing configuration.`);
          }
        }
      } else {
        const rootRouteMetadata = serverConfigRouteTree?.match("") ?? {
          route: "",
          renderMode: RenderMode.Prerender
        };
        routesResults.push(__spreadProps(__spreadValues({}, rootRouteMetadata), {
          // Matched route might be `/*` or `/**`, which would make Angular serve all routes rather than just `/`.
          // So we limit to just `/` for the empty app router case.
          route: ""
        }));
      }
      return {
        baseHref,
        routes: routesResults,
        errors,
        appShellRoute: serverRoutesConfig?.appShellRoute
      };
    } finally {
      platformRef.destroy();
    }
  });
}
function extractRoutesAndCreateRouteTree(options) {
  const {
    url,
    manifest = getAngularAppManifest(),
    invokeGetPrerenderParams = false,
    includePrerenderFallbackRoutes = true,
    signal
  } = options;
  function extract() {
    return __async(this, null, function* () {
      const routeTree = new RouteTree();
      const document2 = yield new ServerAssets(manifest).getIndexServerHtml().text();
      const bootstrap = yield manifest.bootstrap();
      const {
        baseHref,
        appShellRoute,
        routes,
        errors
      } = yield getRoutesFromAngularRouterConfig(bootstrap, document2, url, invokeGetPrerenderParams, includePrerenderFallbackRoutes, manifest.entryPointToBrowserMapping);
      for (const _a2 of routes) {
        const _b = _a2, {
          route
        } = _b, metadata = __objRest(_b, [
          "route"
        ]);
        if (metadata.redirectTo !== void 0) {
          metadata.redirectTo = joinUrlParts(baseHref, metadata.redirectTo);
        }
        for (const [key, value] of Object.entries(metadata)) {
          if (value === void 0) {
            delete metadata[key];
          }
        }
        const fullRoute = joinUrlParts(baseHref, route);
        routeTree.insert(fullRoute, metadata);
      }
      return {
        appShellRoute,
        routeTree,
        errors
      };
    });
  }
  return signal ? promiseWithAbort(extract(), signal, "Routes extraction") : extract();
}
var Hooks = class {
  /**
   * A map of hook names to arrays of hook functions.
   * Each hook name can have multiple associated functions, which are executed in sequence.
   */
  store = /* @__PURE__ */ new Map();
  /**
   * Executes all hooks associated with the specified name, passing the given argument to each hook function.
   * The hooks are invoked sequentially, and the argument may be modified by each hook.
   *
   * @template Hook - The type of the hook name. It should be one of the keys of `HooksMapping`.
   * @param name - The name of the hook whose functions will be executed.
   * @param context - The input value to be passed to each hook function. The value is mutated by each hook function.
   * @returns A promise that resolves once all hook functions have been executed.
   *
   * @example
   * ```typescript
   * const hooks = new Hooks();
   * hooks.on('html:transform:pre', async (ctx) => {
   *   ctx.html = ctx.html.replace(/foo/g, 'bar');
   *   return ctx.html;
   * });
   * const result = await hooks.run('html:transform:pre', { html: '<div>foo</div>' });
   * console.log(result); // '<div>bar</div>'
   * ```
   * @internal
   */
  run(name, context) {
    return __async(this, null, function* () {
      const hooks = this.store.get(name);
      switch (name) {
        case "html:transform:pre": {
          if (!hooks) {
            return context.html;
          }
          const ctx = __spreadValues({}, context);
          for (const hook of hooks) {
            ctx.html = yield hook(ctx);
          }
          return ctx.html;
        }
        default:
          throw new Error(`Running hook "${name}" is not supported.`);
      }
    });
  }
  /**
   * Registers a new hook function under the specified hook name.
   * This function should be a function that takes an argument of type `T` and returns a `string` or `Promise<string>`.
   *
   * @template Hook - The type of the hook name. It should be one of the keys of `HooksMapping`.
   * @param name - The name of the hook under which the function will be registered.
   * @param handler - A function to be executed when the hook is triggered. The handler will be called with an argument
   *                  that may be modified by the hook functions.
   *
   * @remarks
   * - If there are existing handlers registered under the given hook name, the new handler will be added to the list.
   * - If no handlers are registered under the given hook name, a new list will be created with the handler as its first element.
   *
   * @example
   * ```typescript
   * hooks.on('html:transform:pre', async (ctx) => {
   *   return ctx.html.replace(/foo/g, 'bar');
   * });
   * ```
   */
  on(name, handler) {
    const hooks = this.store.get(name);
    if (hooks) {
      hooks.push(handler);
    } else {
      this.store.set(name, [handler]);
    }
  }
  /**
   * Checks if there are any hooks registered under the specified name.
   *
   * @param name - The name of the hook to check.
   * @returns `true` if there are hooks registered under the specified name, otherwise `false`.
   */
  has(name) {
    return !!this.store.get(name)?.length;
  }
};
var ServerRouter = class _ServerRouter {
  routeTree;
  /**
   * Creates an instance of the `ServerRouter`.
   *
   * @param routeTree - An instance of `RouteTree` that holds the routing information.
   * The `RouteTree` is used to match request URLs to the appropriate route metadata.
   */
  constructor(routeTree) {
    this.routeTree = routeTree;
  }
  /**
   * Static property to track the ongoing build promise.
   */
  static #extractionPromise;
  /**
   * Creates or retrieves a `ServerRouter` instance based on the provided manifest and URL.
   *
   * If the manifest contains pre-built routes, a new `ServerRouter` is immediately created.
   * Otherwise, it builds the router by extracting routes from the Angular configuration
   * asynchronously. This method ensures that concurrent builds are prevented by re-using
   * the same promise.
   *
   * @param manifest - An instance of `AngularAppManifest` that contains the route information.
   * @param url - The URL for server-side rendering. The URL is needed to configure `ServerPlatformLocation`.
   * This is necessary to ensure that API requests for relative paths succeed, which is crucial for correct route extraction.
   * [Reference](https://github.com/angular/angular/blob/d608b857c689d17a7ffa33bbb510301014d24a17/packages/platform-server/src/location.ts#L51)
   * @returns A promise resolving to a `ServerRouter` instance.
   */
  static from(manifest, url) {
    if (manifest.routes) {
      const routeTree = RouteTree.fromObject(manifest.routes);
      return Promise.resolve(new _ServerRouter(routeTree));
    }
    _ServerRouter.#extractionPromise ??= extractRoutesAndCreateRouteTree({
      url,
      manifest
    }).then(({
      routeTree,
      errors
    }) => {
      if (errors.length > 0) {
        throw new Error("Error(s) occurred while extracting routes:\n" + errors.map((error) => `- ${error}`).join("\n"));
      }
      return new _ServerRouter(routeTree);
    }).finally(() => {
      _ServerRouter.#extractionPromise = void 0;
    });
    return _ServerRouter.#extractionPromise;
  }
  /**
   * Matches a request URL against the route tree to retrieve route metadata.
   *
   * This method strips 'index.html' from the URL if it is present and then attempts
   * to find a match in the route tree. If a match is found, it returns the associated
   * route metadata; otherwise, it returns `undefined`.
   *
   * @param url - The URL to be matched against the route tree.
   * @returns The metadata for the matched route or `undefined` if no match is found.
   */
  match(url) {
    const {
      pathname
    } = stripIndexHtmlFromURL(url);
    return this.routeTree.match(decodeURIComponent(pathname));
  }
};
function sha256(data) {
  return __async(this, null, function* () {
    const encodedData = new TextEncoder().encode(data);
    const hashBuffer = yield crypto.subtle.digest("SHA-256", encodedData);
    const hashParts = [];
    for (const h of new Uint8Array(hashBuffer)) {
      hashParts.push(h.toString(16).padStart(2, "0"));
    }
    return hashParts.join("");
  });
}
var MEDIA_SET_HANDLER_PATTERN = /^this\.media=["'](.*)["'];?$/;
var CSP_MEDIA_ATTR = "ngCspMedia";
var LINK_LOAD_SCRIPT_CONTENT = (() => `(() => {
  const CSP_MEDIA_ATTR = '${CSP_MEDIA_ATTR}';
  const documentElement = document.documentElement;

  // Listener for load events on link tags.
  const listener = (e) => {
    const target = e.target;
    if (
      !target ||
      target.tagName !== 'LINK' ||
      !target.hasAttribute(CSP_MEDIA_ATTR)
    ) {
      return;
    }

    target.media = target.getAttribute(CSP_MEDIA_ATTR);
    target.removeAttribute(CSP_MEDIA_ATTR);

    if (!document.head.querySelector(\`link[\${CSP_MEDIA_ATTR}]\`)) {
      documentElement.removeEventListener('load', listener);
    }
  };

  documentElement.addEventListener('load', listener, true);
})();`)();
var BeastiesBase = class extends Beasties {
};
var InlineCriticalCssProcessor = class _InlineCriticalCssProcessor extends BeastiesBase {
  readFile;
  outputPath;
  addedCspScriptsDocuments = /* @__PURE__ */ new WeakSet();
  documentNonces = /* @__PURE__ */ new WeakMap();
  constructor(readFile2, outputPath) {
    super({
      logger: {
        // eslint-disable-next-line no-console
        warn: (s) => console.warn(s),
        // eslint-disable-next-line no-console
        error: (s) => console.error(s),
        info: () => {
        }
      },
      logLevel: "warn",
      path: outputPath,
      publicPath: void 0,
      compress: false,
      pruneSource: false,
      reduceInlineStyles: false,
      mergeStylesheets: false,
      // Note: if `preload` changes to anything other than `media`, the logic in
      // `embedLinkedStylesheet` will have to be updated.
      preload: "media",
      noscriptFallback: true,
      inlineFonts: true
    });
    this.readFile = readFile2;
    this.outputPath = outputPath;
  }
  /**
   * Override of the Beasties `embedLinkedStylesheet` method
   * that makes it work with Angular's CSP APIs.
   */
  embedLinkedStylesheet(link2, document2) {
    return __async(this, null, function* () {
      if (link2.getAttribute("media") === "print" && link2.next?.name === "noscript") {
        const media = link2.getAttribute("onload")?.match(MEDIA_SET_HANDLER_PATTERN);
        if (media) {
          link2.removeAttribute("onload");
          link2.setAttribute("media", media[1]);
          link2?.next?.remove();
        }
      }
      const returnValue = yield __superGet(_InlineCriticalCssProcessor.prototype, this, "embedLinkedStylesheet").call(this, link2, document2);
      const cspNonce = this.findCspNonce(document2);
      if (cspNonce) {
        const beastiesMedia = link2.getAttribute("onload")?.match(MEDIA_SET_HANDLER_PATTERN);
        if (beastiesMedia) {
          link2.removeAttribute("onload");
          link2.setAttribute(CSP_MEDIA_ATTR, beastiesMedia[1]);
          this.conditionallyInsertCspLoadingScript(document2, cspNonce, link2);
        }
        document2.head.children.forEach((child) => {
          if (child.tagName === "style" && !child.hasAttribute("nonce")) {
            child.setAttribute("nonce", cspNonce);
          }
        });
      }
      return returnValue;
    });
  }
  /**
   * Finds the CSP nonce for a specific document.
   */
  findCspNonce(document2) {
    if (this.documentNonces.has(document2)) {
      return this.documentNonces.get(document2);
    }
    const nonceElement = document2.querySelector("[ngCspNonce], [ngcspnonce]");
    const cspNonce = nonceElement?.getAttribute("ngCspNonce") || nonceElement?.getAttribute("ngcspnonce") || null;
    this.documentNonces.set(document2, cspNonce);
    return cspNonce;
  }
  /**
   * Inserts the `script` tag that swaps the critical CSS at runtime,
   * if one hasn't been inserted into the document already.
   */
  conditionallyInsertCspLoadingScript(document2, nonce, link2) {
    if (this.addedCspScriptsDocuments.has(document2)) {
      return;
    }
    if (document2.head.textContent.includes(LINK_LOAD_SCRIPT_CONTENT)) {
      this.addedCspScriptsDocuments.add(document2);
      return;
    }
    const script = document2.createElement("script");
    script.setAttribute("nonce", nonce);
    script.textContent = LINK_LOAD_SCRIPT_CONTENT;
    document2.head.insertBefore(script, link2);
    this.addedCspScriptsDocuments.add(document2);
  }
};
var LRUCache = class {
  /**
   * The maximum number of items the cache can hold.
   */
  capacity;
  /**
   * Internal storage for the cache, mapping keys to their associated nodes in the linked list.
   */
  cache = /* @__PURE__ */ new Map();
  /**
   * Head of the doubly linked list, representing the most recently used item.
   */
  head;
  /**
   * Tail of the doubly linked list, representing the least recently used item.
   */
  tail;
  /**
   * Creates a new LRUCache instance.
   * @param capacity The maximum number of items the cache can hold.
   */
  constructor(capacity) {
    this.capacity = capacity;
  }
  /**
   * Gets the value associated with the given key.
   * @param key The key to retrieve the value for.
   * @returns The value associated with the key, or undefined if the key is not found.
   */
  get(key) {
    const node2 = this.cache.get(key);
    if (node2) {
      this.moveToHead(node2);
      return node2.value;
    }
    return void 0;
  }
  /**
   * Puts a key-value pair into the cache.
   * If the key already exists, the value is updated.
   * If the cache is full, the least recently used item is evicted.
   * @param key The key to insert or update.
   * @param value The value to associate with the key.
   */
  put(key, value) {
    const cachedNode = this.cache.get(key);
    if (cachedNode) {
      cachedNode.value = value;
      this.moveToHead(cachedNode);
      return;
    }
    const newNode = {
      key,
      value,
      prev: void 0,
      next: void 0
    };
    this.cache.set(key, newNode);
    this.addToHead(newNode);
    if (this.cache.size > this.capacity) {
      const tail = this.removeTail();
      if (tail) {
        this.cache.delete(tail.key);
      }
    }
  }
  /**
   * Adds a node to the head of the linked list.
   * @param node The node to add.
   */
  addToHead(node2) {
    node2.next = this.head;
    node2.prev = void 0;
    if (this.head) {
      this.head.prev = node2;
    }
    this.head = node2;
    if (!this.tail) {
      this.tail = node2;
    }
  }
  /**
   * Removes a node from the linked list.
   * @param node The node to remove.
   */
  removeNode(node2) {
    if (node2.prev) {
      node2.prev.next = node2.next;
    } else {
      this.head = node2.next;
    }
    if (node2.next) {
      node2.next.prev = node2.prev;
    } else {
      this.tail = node2.prev;
    }
  }
  /**
   * Moves a node to the head of the linked list.
   * @param node The node to move.
   */
  moveToHead(node2) {
    this.removeNode(node2);
    this.addToHead(node2);
  }
  /**
   * Removes the tail node from the linked list.
   * @returns The removed tail node, or undefined if the list is empty.
   */
  removeTail() {
    const node2 = this.tail;
    if (node2) {
      this.removeNode(node2);
    }
    return node2;
  }
};
var MAX_INLINE_CSS_CACHE_ENTRIES = 50;
var SERVER_CONTEXT_VALUE = {
  [RenderMode.Prerender]: "ssg",
  [RenderMode.Server]: "ssr",
  [RenderMode.Client]: ""
};
var AngularServerApp = class {
  options;
  /**
   * Whether prerendered routes should be rendered on demand or served directly.
   *
   * @see {@link AngularServerAppOptions.allowStaticRouteRender} for more details.
   */
  allowStaticRouteRender;
  /**
   * Hooks for extending or modifying server behavior.
   *
   * @see {@link AngularServerAppOptions.hooks} for more details.
   */
  hooks;
  /**
   * Constructs an instance of `AngularServerApp`.
   *
   * @param options Optional configuration options for the server application.
   */
  constructor(options = {}) {
    this.options = options;
    this.allowStaticRouteRender = this.options.allowStaticRouteRender ?? false;
    this.hooks = options.hooks ?? new Hooks();
  }
  /**
   * The manifest associated with this server application.
   */
  manifest = getAngularAppManifest();
  /**
   * An instance of ServerAsset that handles server-side asset.
   */
  assets = new ServerAssets(this.manifest);
  /**
   * The router instance used for route matching and handling.
   */
  router;
  /**
   * The `inlineCriticalCssProcessor` is responsible for handling critical CSS inlining.
   */
  inlineCriticalCssProcessor;
  /**
   * The bootstrap mechanism for the server application.
   */
  boostrap;
  /**
   * Cache for storing critical CSS for pages.
   * Stores a maximum of MAX_INLINE_CSS_CACHE_ENTRIES entries.
   *
   * Uses an LRU (Least Recently Used) eviction policy, meaning that when the cache is full,
   * the least recently accessed page's critical CSS will be removed to make space for new entries.
   */
  criticalCssLRUCache = new LRUCache(MAX_INLINE_CSS_CACHE_ENTRIES);
  /**
   * Handles an incoming HTTP request by serving prerendered content, performing server-side rendering,
   * or delivering a static file for client-side rendered routes based on the `RenderMode` setting.
   *
   * @param request - The HTTP request to handle.
   * @param requestContext - Optional context for rendering, such as metadata associated with the request.
   * @returns A promise that resolves to the resulting HTTP response object, or `null` if no matching Angular route is found.
   *
   * @remarks A request to `https://www.example.com/page/index.html` will serve or render the Angular route
   * corresponding to `https://www.example.com/page`.
   */
  handle(request, requestContext) {
    return __async(this, null, function* () {
      const url = new URL(request.url);
      this.router ??= yield ServerRouter.from(this.manifest, url);
      const matchedRoute = this.router.match(url);
      if (!matchedRoute) {
        return null;
      }
      const {
        redirectTo,
        status,
        renderMode
      } = matchedRoute;
      if (redirectTo !== void 0) {
        return new Response(null, {
          // Note: The status code is validated during route extraction.
          // 302 Found is used by default for redirections
          // See: https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect_static#status
          status: status ?? 302,
          headers: {
            "Location": buildPathWithParams(redirectTo, url.pathname)
          }
        });
      }
      if (renderMode === RenderMode.Prerender) {
        const response = yield this.handleServe(request, matchedRoute);
        if (response) {
          return response;
        }
      }
      return promiseWithAbort(this.handleRendering(request, matchedRoute, requestContext), request.signal, `Request for: ${request.url}`);
    });
  }
  /**
   * Handles serving a prerendered static asset if available for the matched route.
   *
   * This method only supports `GET` and `HEAD` requests.
   *
   * @param request - The incoming HTTP request for serving a static page.
   * @param matchedRoute - The metadata of the matched route for rendering.
   * If not provided, the method attempts to find a matching route based on the request URL.
   * @returns A promise that resolves to a `Response` object if the prerendered page is found, or `null`.
   */
  handleServe(request, matchedRoute) {
    return __async(this, null, function* () {
      const {
        headers,
        renderMode
      } = matchedRoute;
      if (renderMode !== RenderMode.Prerender) {
        return null;
      }
      const {
        method
      } = request;
      if (method !== "GET" && method !== "HEAD") {
        return null;
      }
      const assetPath = this.buildServerAssetPathFromRequest(request);
      const {
        manifest: {
          locale
        },
        assets
      } = this;
      if (!assets.hasServerAsset(assetPath)) {
        return null;
      }
      const {
        text,
        hash,
        size
      } = assets.getServerAsset(assetPath);
      const etag = `"${hash}"`;
      return request.headers.get("if-none-match") === etag ? new Response(void 0, {
        status: 304,
        statusText: "Not Modified"
      }) : new Response(yield text(), {
        headers: __spreadValues(__spreadValues({
          "Content-Length": size.toString(),
          "ETag": etag,
          "Content-Type": "text/html;charset=UTF-8"
        }, locale !== void 0 ? {
          "Content-Language": locale
        } : {}), headers)
      });
    });
  }
  /**
   * Handles the server-side rendering process for the given HTTP request.
   * This method matches the request URL to a route and performs rendering if a matching route is found.
   *
   * @param request - The incoming HTTP request to be processed.
   * @param matchedRoute - The metadata of the matched route for rendering.
   * If not provided, the method attempts to find a matching route based on the request URL.
   * @param requestContext - Optional additional context for rendering, such as request metadata.
   *
   * @returns A promise that resolves to the rendered response, or null if no matching route is found.
   */
  handleRendering(request, matchedRoute, requestContext) {
    return __async(this, null, function* () {
      const {
        renderMode,
        headers,
        status,
        preload
      } = matchedRoute;
      if (!this.allowStaticRouteRender && renderMode === RenderMode.Prerender) {
        return null;
      }
      const url = new URL(request.url);
      const platformProviders = [];
      const {
        manifest: {
          bootstrap,
          inlineCriticalCss,
          locale
        },
        assets
      } = this;
      const responseInit = {
        status,
        headers: new Headers(__spreadValues(__spreadValues({
          "Content-Type": "text/html;charset=UTF-8"
        }, locale !== void 0 ? {
          "Content-Language": locale
        } : {}), headers))
      };
      if (renderMode === RenderMode.Server) {
        platformProviders.push({
          provide: REQUEST,
          useValue: request
        }, {
          provide: REQUEST_CONTEXT,
          useValue: requestContext
        }, {
          provide: RESPONSE_INIT,
          useValue: responseInit
        });
      } else if (renderMode === RenderMode.Client) {
        let html2 = yield this.assets.getServerAsset("index.csr.html").text();
        html2 = yield this.runTransformsOnHtml(html2, url, preload);
        return new Response(html2, responseInit);
      }
      if (locale !== void 0) {
        platformProviders.push({
          provide: LOCALE_ID,
          useValue: locale
        });
      }
      this.boostrap ??= yield bootstrap();
      let html = yield assets.getIndexServerHtml().text();
      html = yield this.runTransformsOnHtml(html, url, preload);
      html = yield renderAngular(html, this.boostrap, url, platformProviders, SERVER_CONTEXT_VALUE[renderMode]);
      if (inlineCriticalCss) {
        this.inlineCriticalCssProcessor ??= new InlineCriticalCssProcessor((path2) => {
          const fileName = path2.split("/").pop() ?? path2;
          return this.assets.getServerAsset(fileName).text();
        });
        if (renderMode === RenderMode.Server && typeof crypto === "undefined") {
          console.error(`The global 'crypto' module is unavailable. If you are running on Node.js, please ensure you are using version 20 or later, which includes built-in support for the Web Crypto module.`);
        }
        if (renderMode === RenderMode.Server && typeof crypto !== "undefined") {
          const cacheKey = yield sha256(html);
          let htmlWithCriticalCss = this.criticalCssLRUCache.get(cacheKey);
          if (htmlWithCriticalCss === void 0) {
            htmlWithCriticalCss = yield this.inlineCriticalCssProcessor.process(html);
            this.criticalCssLRUCache.put(cacheKey, htmlWithCriticalCss);
          }
          html = htmlWithCriticalCss;
        } else {
          html = yield this.inlineCriticalCssProcessor.process(html);
        }
      }
      return new Response(html, responseInit);
    });
  }
  /**
   * Constructs the asset path on the server based on the provided HTTP request.
   *
   * This method processes the incoming request URL to derive a path corresponding
   * to the requested asset. It ensures the path points to the correct file (e.g.,
   * `index.html`) and removes any base href if it is not part of the asset path.
   *
   * @param request - The incoming HTTP request object.
   * @returns The server-relative asset path derived from the request.
   */
  buildServerAssetPathFromRequest(request) {
    let {
      pathname: assetPath
    } = new URL(request.url);
    if (!assetPath.endsWith("/index.html")) {
      assetPath = joinUrlParts(assetPath, "index.html");
    }
    const {
      baseHref
    } = this.manifest;
    if (baseHref.length > 1 && assetPath.startsWith(baseHref)) {
      assetPath = assetPath.slice(baseHref.length);
    }
    return stripLeadingSlash(assetPath);
  }
  /**
   * Runs the registered transform hooks on the given HTML content.
   *
   * @param html - The raw HTML content to be transformed.
   * @param url - The URL associated with the HTML content, used for context during transformations.
   * @param preload - An array of URLs representing the JavaScript resources to preload.
   * @returns A promise that resolves to the transformed HTML string.
   */
  runTransformsOnHtml(html, url, preload) {
    return __async(this, null, function* () {
      if (this.hooks.has("html:transform:pre")) {
        html = yield this.hooks.run("html:transform:pre", {
          html,
          url
        });
      }
      if (preload?.length) {
        html = appendPreloadHintsToHtml(html, preload);
      }
      return html;
    });
  }
};
var angularServerApp;
function getOrCreateAngularServerApp(options) {
  return angularServerApp ??= new AngularServerApp(options);
}
function destroyAngularServerApp() {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    resetCompiledComponents();
  }
  angularServerApp = void 0;
}
function appendPreloadHintsToHtml(html, preload) {
  const bodyCloseIdx = html.lastIndexOf("</body>");
  if (bodyCloseIdx === -1) {
    return html;
  }
  return [html.slice(0, bodyCloseIdx), ...preload.map((val) => `<link rel="modulepreload" href="${val}">`), html.slice(bodyCloseIdx)].join("\n");
}
function getPotentialLocaleIdFromUrl(url, basePath) {
  const {
    pathname
  } = url;
  let start = basePath.length;
  if (pathname[start] === "/") {
    start++;
  }
  let end = pathname.indexOf("/", start);
  if (end === -1) {
    end = pathname.length;
  }
  return pathname.slice(start, end);
}
function parseLanguageHeader(header) {
  if (header === "*") {
    return /* @__PURE__ */ new Map([["*", 1]]);
  }
  const parsedValues = header.split(",").map((item) => {
    const [locale, qualityValue] = item.split(";", 2).map((v) => v.trim());
    let quality = qualityValue?.startsWith("q=") ? parseFloat(qualityValue.slice(2)) : void 0;
    if (typeof quality !== "number" || isNaN(quality) || quality < 0 || quality > 1) {
      quality = 1;
    }
    return [locale, quality];
  }).sort(([_localeA, qualityA], [_localeB, qualityB]) => qualityB - qualityA);
  return new Map(parsedValues);
}
function getPreferredLocale(header, supportedLocales) {
  if (supportedLocales.length < 2) {
    return supportedLocales[0];
  }
  const parsedLocales = parseLanguageHeader(header);
  if (parsedLocales.size === 0 || parsedLocales.size === 1 && parsedLocales.has("*")) {
    return supportedLocales[0];
  }
  const normalizedSupportedLocales = /* @__PURE__ */ new Map();
  for (const locale of supportedLocales) {
    normalizedSupportedLocales.set(normalizeLocale(locale), locale);
  }
  let bestMatch;
  const qualityZeroNormalizedLocales = /* @__PURE__ */ new Set();
  for (const [locale, quality] of parsedLocales) {
    const normalizedLocale = normalizeLocale(locale);
    if (quality === 0) {
      qualityZeroNormalizedLocales.add(normalizedLocale);
      continue;
    }
    if (normalizedSupportedLocales.has(normalizedLocale)) {
      return normalizedSupportedLocales.get(normalizedLocale);
    }
    if (bestMatch !== void 0) {
      continue;
    }
    const [languagePrefix] = normalizedLocale.split("-", 1);
    for (const supportedLocale of normalizedSupportedLocales.keys()) {
      if (supportedLocale.startsWith(languagePrefix)) {
        bestMatch = normalizedSupportedLocales.get(supportedLocale);
        break;
      }
    }
  }
  if (bestMatch !== void 0) {
    return bestMatch;
  }
  for (const [normalizedLocale, locale] of normalizedSupportedLocales) {
    if (!qualityZeroNormalizedLocales.has(normalizedLocale)) {
      return locale;
    }
  }
}
function normalizeLocale(locale) {
  return locale.toLowerCase();
}
var AngularAppEngine = class _AngularAppEngine {
  /**
   * A flag to enable or disable the rendering of prerendered routes.
   *
   * Typically used during development to avoid prerendering all routes ahead of time,
   * allowing them to be rendered on the fly as requested.
   *
   * @private
   */
  static ɵallowStaticRouteRender = false;
  /**
   * Hooks for extending or modifying the behavior of the server application.
   * These hooks are used by the Angular CLI when running the development server and
   * provide extensibility points for the application lifecycle.
   *
   * @private
   */
  static ɵhooks = new Hooks();
  /**
   * The manifest for the server application.
   */
  manifest = getAngularAppEngineManifest();
  /**
   * A map of supported locales from the server application's manifest.
   */
  supportedLocales = Object.keys(this.manifest.supportedLocales);
  /**
   * A cache that holds entry points, keyed by their potential locale string.
   */
  entryPointsCache = /* @__PURE__ */ new Map();
  /**
   * Handles an incoming HTTP request by serving prerendered content, performing server-side rendering,
   * or delivering a static file for client-side rendered routes based on the `RenderMode` setting.
   *
   * @param request - The HTTP request to handle.
   * @param requestContext - Optional context for rendering, such as metadata associated with the request.
   * @returns A promise that resolves to the resulting HTTP response object, or `null` if no matching Angular route is found.
   *
   * @remarks A request to `https://www.example.com/page/index.html` will serve or render the Angular route
   * corresponding to `https://www.example.com/page`.
   */
  handle(request, requestContext) {
    return __async(this, null, function* () {
      const serverApp = yield this.getAngularServerAppForRequest(request);
      if (serverApp) {
        return serverApp.handle(request, requestContext);
      }
      if (this.supportedLocales.length > 1) {
        return this.redirectBasedOnAcceptLanguage(request);
      }
      return null;
    });
  }
  /**
   * Handles requests for the base path when i18n is enabled.
   * Redirects the user to a locale-specific path based on the `Accept-Language` header.
   *
   * @param request The incoming request.
   * @returns A `Response` object with a 302 redirect, or `null` if i18n is not enabled
   *          or the request is not for the base path.
   */
  redirectBasedOnAcceptLanguage(request) {
    const {
      basePath,
      supportedLocales
    } = this.manifest;
    const {
      pathname
    } = new URL(request.url);
    if (pathname !== basePath) {
      return null;
    }
    const preferredLocale = getPreferredLocale(request.headers.get("Accept-Language") || "*", this.supportedLocales);
    if (preferredLocale) {
      const subPath = supportedLocales[preferredLocale];
      if (subPath !== void 0) {
        return new Response(null, {
          status: 302,
          // Use a 302 redirect as language preference may change.
          headers: {
            "Location": joinUrlParts(pathname, subPath),
            "Vary": "Accept-Language"
          }
        });
      }
    }
    return null;
  }
  /**
   * Retrieves the Angular server application instance for a given request.
   *
   * This method checks if the request URL corresponds to an Angular application entry point.
   * If so, it initializes or retrieves an instance of the Angular server application for that entry point.
   * Requests that resemble file requests (except for `/index.html`) are skipped.
   *
   * @param request - The incoming HTTP request object.
   * @returns A promise that resolves to an `AngularServerApp` instance if a valid entry point is found,
   * or `null` if no entry point matches the request URL.
   */
  getAngularServerAppForRequest(request) {
    return __async(this, null, function* () {
      const url = new URL(request.url);
      const entryPoint = yield this.getEntryPointExportsForUrl(url);
      if (!entryPoint) {
        return null;
      }
      const ɵgetOrCreateAngularServerApp = entryPoint.ɵgetOrCreateAngularServerApp;
      const serverApp = ɵgetOrCreateAngularServerApp({
        allowStaticRouteRender: _AngularAppEngine.ɵallowStaticRouteRender,
        hooks: _AngularAppEngine.ɵhooks
      });
      return serverApp;
    });
  }
  /**
   * Retrieves the exports for a specific entry point, caching the result.
   *
   * @param potentialLocale - The locale string used to find the corresponding entry point.
   * @returns A promise that resolves to the entry point exports or `undefined` if not found.
   */
  getEntryPointExports(potentialLocale) {
    const cachedEntryPoint = this.entryPointsCache.get(potentialLocale);
    if (cachedEntryPoint) {
      return cachedEntryPoint;
    }
    const {
      entryPoints
    } = this.manifest;
    const entryPoint = entryPoints[potentialLocale];
    if (!entryPoint) {
      return void 0;
    }
    const entryPointExports = entryPoint();
    this.entryPointsCache.set(potentialLocale, entryPointExports);
    return entryPointExports;
  }
  /**
   * Retrieves the entry point for a given URL by determining the locale and mapping it to
   * the appropriate application bundle.
   *
   * This method determines the appropriate entry point and locale for rendering the application by examining the URL.
   * If there is only one entry point available, it is returned regardless of the URL.
   * Otherwise, the method extracts a potential locale identifier from the URL and looks up the corresponding entry point.
   *
   * @param url - The URL of the request.
   * @returns A promise that resolves to the entry point exports or `undefined` if not found.
   */
  getEntryPointExportsForUrl(url) {
    const {
      basePath
    } = this.manifest;
    if (this.supportedLocales.length === 1) {
      return this.getEntryPointExports("");
    }
    const potentialLocale = getPotentialLocaleIdFromUrl(url, basePath);
    return this.getEntryPointExports(potentialLocale) ?? this.getEntryPointExports("");
  }
};
function createRequestHandler(handler) {
  handler["__ng_request_handler__"] = true;
  return handler;
}

export {
  setAngularAppManifest,
  setAngularAppEngineManifest,
  RenderMode,
  PrerenderFallback,
  provideServerRoutesConfig,
  provideServerRouting,
  withAppShell,
  getRoutesFromAngularRouterConfig,
  extractRoutesAndCreateRouteTree,
  InlineCriticalCssProcessor,
  getOrCreateAngularServerApp,
  destroyAngularServerApp,
  AngularAppEngine,
  createRequestHandler
};
/*! Bundled license information:

@angular/router/fesm2022/router-B-Y85L0c.mjs:
  (**
   * @license Angular v19.2.7
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/router/fesm2022/router_module-CbmfhtZA.mjs:
  (**
   * @license Angular v19.2.7
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/router/fesm2022/router.mjs:
  (**
   * @license Angular v19.2.7
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-UM2IRUWU.js.map
