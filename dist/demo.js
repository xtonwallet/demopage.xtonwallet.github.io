
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function xlink_attr(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function getEventsAction() {
        const component = get_current_component();
        return node => {
          const events = Object.keys(component.$$.callbacks);
          const listeners = [];

          events.forEach(
              event => listeners.push(
                  listen(node, event, e =>  bubble(component, e))
                )
            );
      
          return {
            destroy: () => {
                listeners.forEach(
                    listener => listener()
                );
            }
          }
        };
    }

    /* node_modules\svelte-chota\cmp\Container.svelte generated by Svelte v3.44.2 */

    function create_fragment$a(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	let div_levels = [/*$$restProps*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	return {
    		c() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "container", 1);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[0].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
    			toggle_class(div, "container", 1);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const events = getEventsAction();

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
    	};

    	return [events, $$restProps, $$scope, slots];
    }

    class Container extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});
    	}
    }

    /* node_modules\svelte-chota\cmp\Row.svelte generated by Svelte v3.44.2 */

    function create_fragment$9(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	let div_levels = [/*$$restProps*/ ctx[2]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	return {
    		c() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "row", 1);
    			toggle_class(div, "reverse", /*reverse*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[1].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]]));
    			toggle_class(div, "row", 1);
    			toggle_class(div, "reverse", /*reverse*/ ctx[0]);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$9($$self, $$props, $$invalidate) {
    	const omit_props_names = ["reverse"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { reverse = false } = $$props;
    	const events = getEventsAction();

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('reverse' in $$new_props) $$invalidate(0, reverse = $$new_props.reverse);
    		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	return [reverse, events, $$restProps, $$scope, slots];
    }

    class Row extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { reverse: 0 });
    	}
    }

    /* node_modules\svelte-chota\cmp\Col.svelte generated by Svelte v3.44.2 */

    function create_fragment$8(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	let div_levels = [/*$$restProps*/ ctx[2], { class: /*classes*/ ctx[0] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	return {
    		c() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[1].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["size","sizeMD","sizeLG"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { size = false } = $$props;
    	let { sizeMD = false } = $$props;
    	let { sizeLG = false } = $$props;
    	const events = getEventsAction();

    	function get_col_classes(d, md, lg) {
    		let list = [];
    		if (!size || (size < 1 || size > 12)) list.push('col'); else if (size >= 1 && size <= 12) list.push(`col-${size}`);
    		if (sizeMD) if (sizeMD >= 1 && sizeMD <= 12) list.push(`col-${sizeMD}-md`);
    		if (sizeLG) if (sizeLG >= 1 && sizeLG <= 12) list.push(`col-${sizeLG}-lg`);
    		return list.join(' ');
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(3, size = $$new_props.size);
    		if ('sizeMD' in $$new_props) $$invalidate(4, sizeMD = $$new_props.sizeMD);
    		if ('sizeLG' in $$new_props) $$invalidate(5, sizeLG = $$new_props.sizeLG);
    		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
    	};

    	$$self.$$.update = () => {
    		$$invalidate(0, classes = $$restProps.hasOwnProperty('class')
    		? $$restProps['class'] + ' ' + get_col_classes()
    		: get_col_classes());
    	};

    	return [classes, events, $$restProps, size, sizeMD, sizeLG, $$scope, slots];
    }

    class Col extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { size: 3, sizeMD: 4, sizeLG: 5 });
    	}
    }

    /* node_modules\svelte-chota\cmp\Card.svelte generated by Svelte v3.44.2 */
    const get_footer_slot_changes = dirty => ({});
    const get_footer_slot_context = ctx => ({});
    const get_header_slot_changes = dirty => ({});
    const get_header_slot_context = ctx => ({});

    // (8:0) {#if $$slots.header}
    function create_if_block_1$3(ctx) {
    	let header;
    	let current;
    	const header_slot_template = /*#slots*/ ctx[4].header;
    	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[3], get_header_slot_context);

    	return {
    		c() {
    			header = element("header");
    			if (header_slot) header_slot.c();
    		},
    		m(target, anchor) {
    			insert(target, header, anchor);

    			if (header_slot) {
    				header_slot.m(header, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (header_slot) {
    				if (header_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						header_slot,
    						header_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[3], dirty, get_header_slot_changes),
    						get_header_slot_context
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(header_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(header_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(header);
    			if (header_slot) header_slot.d(detaching);
    		}
    	};
    }

    // (14:0) {#if $$slots.footer}
    function create_if_block$5(ctx) {
    	let footer;
    	let current;
    	const footer_slot_template = /*#slots*/ ctx[4].footer;
    	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[3], get_footer_slot_context);

    	return {
    		c() {
    			footer = element("footer");
    			if (footer_slot) footer_slot.c();
    		},
    		m(target, anchor) {
    			insert(target, footer, anchor);

    			if (footer_slot) {
    				footer_slot.m(footer, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (footer_slot) {
    				if (footer_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						footer_slot,
    						footer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(footer_slot_template, /*$$scope*/ ctx[3], dirty, get_footer_slot_changes),
    						get_footer_slot_context
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(footer_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(footer_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(footer);
    			if (footer_slot) footer_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$7(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*$$slots*/ ctx[2].header && create_if_block_1$3(ctx);
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	let if_block1 = /*$$slots*/ ctx[2].footer && create_if_block$5(ctx);
    	let div_levels = [/*$$restProps*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	return {
    		c() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "card", 1);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t0);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[0].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (/*$$slots*/ ctx[2].header) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*$$slots*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*$$slots*/ ctx[2].footer) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$$slots*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$5(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
    			toggle_class(div, "card", 1);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(default_slot, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block0);
    			transition_out(default_slot, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block0) if_block0.d();
    			if (default_slot) default_slot.d(detaching);
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	const $$slots = compute_slots(slots);
    	const events = getEventsAction();

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	return [events, $$restProps, $$slots, $$scope, slots];
    }

    class Card extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
    	}
    }

    /* node_modules\svelte-chota\cmp\Icon.svelte generated by Svelte v3.44.2 */

    function create_else_block$4(ctx) {
    	let svg;
    	let mounted;
    	let dispose;

    	function select_block_type_1(ctx, dirty) {
    		if (/*spin*/ ctx[0] !== false) return create_if_block_2$1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);
    	let svg_levels = [{ viewBox: "0 0 24 24" }, { style: /*style*/ ctx[5] }, /*$$restProps*/ ctx[9]];
    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	return {
    		c() {
    			svg = svg_element("svg");
    			if_block.c();
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "svelte-1q4wean", true);
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			if_block.m(svg, null);

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[8].call(null, svg));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(svg, null);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ viewBox: "0 0 24 24" },
    				dirty & /*style*/ 32 && { style: /*style*/ ctx[5] },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			toggle_class(svg, "svelte-1q4wean", true);
    		},
    		d(detaching) {
    			if (detaching) detach(svg);
    			if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (75:14) 
    function create_if_block_1$2(ctx) {
    	let svg;
    	let use_1;
    	let mounted;
    	let dispose;
    	let svg_levels = [{ viewBox: "0 0 24 24" }, { style: /*style*/ ctx[5] }, /*$$restProps*/ ctx[9]];
    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	return {
    		c() {
    			svg = svg_element("svg");
    			use_1 = svg_element("use");
    			xlink_attr(use_1, "xlink:href", /*use*/ ctx[2]);
    			attr(use_1, "style", /*aniStyle*/ ctx[4]);
    			attr(use_1, "class", "svelte-1q4wean");
    			toggle_class(use_1, "spinCW", /*spinCW*/ ctx[7]);
    			toggle_class(use_1, "spinCCW", /*spinCCW*/ ctx[6]);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "svelte-1q4wean", true);
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, use_1);

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[8].call(null, svg));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*use*/ 4) {
    				xlink_attr(use_1, "xlink:href", /*use*/ ctx[2]);
    			}

    			if (dirty & /*aniStyle*/ 16) {
    				attr(use_1, "style", /*aniStyle*/ ctx[4]);
    			}

    			if (dirty & /*spinCW*/ 128) {
    				toggle_class(use_1, "spinCW", /*spinCW*/ ctx[7]);
    			}

    			if (dirty & /*spinCCW*/ 64) {
    				toggle_class(use_1, "spinCCW", /*spinCCW*/ ctx[6]);
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ viewBox: "0 0 24 24" },
    				dirty & /*style*/ 32 && { style: /*style*/ ctx[5] },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			toggle_class(svg, "svelte-1q4wean", true);
    		},
    		d(detaching) {
    			if (detaching) detach(svg);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (71:0) {#if url}
    function create_if_block$4(ctx) {
    	let span;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;
    	let span_levels = [{ style: /*style*/ ctx[5] }, /*$$restProps*/ ctx[9]];
    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	return {
    		c() {
    			span = element("span");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*url*/ ctx[3])) attr(img, "src", img_src_value);
    			attr(img, "alt", "");
    			attr(img, "width", "100%");
    			attr(img, "height", "100%");
    			attr(img, "style", /*aniStyle*/ ctx[4]);
    			attr(img, "class", "svelte-1q4wean");
    			toggle_class(img, "spinCW", /*spinCW*/ ctx[7]);
    			toggle_class(img, "spinCCW", /*spinCCW*/ ctx[6]);
    			set_attributes(span, span_data);
    			toggle_class(span, "svelte-1q4wean", true);
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, img);

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[8].call(null, span));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*url*/ 8 && !src_url_equal(img.src, img_src_value = /*url*/ ctx[3])) {
    				attr(img, "src", img_src_value);
    			}

    			if (dirty & /*aniStyle*/ 16) {
    				attr(img, "style", /*aniStyle*/ ctx[4]);
    			}

    			if (dirty & /*spinCW*/ 128) {
    				toggle_class(img, "spinCW", /*spinCW*/ ctx[7]);
    			}

    			if (dirty & /*spinCCW*/ 64) {
    				toggle_class(img, "spinCCW", /*spinCCW*/ ctx[6]);
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [
    				dirty & /*style*/ 32 && { style: /*style*/ ctx[5] },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			toggle_class(span, "svelte-1q4wean", true);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (85:1) {:else}
    function create_else_block_1(ctx) {
    	let path_1;

    	return {
    		c() {
    			path_1 = svg_element("path");
    			attr(path_1, "d", /*path*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, path_1, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*path*/ 2) {
    				attr(path_1, "d", /*path*/ ctx[1]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(path_1);
    		}
    	};
    }

    // (81:1) {#if spin !== false}
    function create_if_block_2$1(ctx) {
    	let g;
    	let path_1;

    	return {
    		c() {
    			g = svg_element("g");
    			path_1 = svg_element("path");
    			attr(path_1, "d", /*path*/ ctx[1]);
    			attr(g, "style", /*aniStyle*/ ctx[4]);
    			attr(g, "class", "svelte-1q4wean");
    			toggle_class(g, "spinCW", /*spinCW*/ ctx[7]);
    			toggle_class(g, "spinCCW", /*spinCCW*/ ctx[6]);
    		},
    		m(target, anchor) {
    			insert(target, g, anchor);
    			append(g, path_1);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*path*/ 2) {
    				attr(path_1, "d", /*path*/ ctx[1]);
    			}

    			if (dirty & /*aniStyle*/ 16) {
    				attr(g, "style", /*aniStyle*/ ctx[4]);
    			}

    			if (dirty & /*spinCW*/ 128) {
    				toggle_class(g, "spinCW", /*spinCW*/ ctx[7]);
    			}

    			if (dirty & /*spinCCW*/ 64) {
    				toggle_class(g, "spinCCW", /*spinCCW*/ ctx[6]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(g);
    		}
    	};
    }

    function create_fragment$6(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*url*/ ctx[3]) return create_if_block$4;
    		if (/*use*/ ctx[2]) return create_if_block_1$2;
    		return create_else_block$4;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let inverse;
    	let spintime;
    	let spinCW;
    	let spinCCW;
    	let style;
    	let aniStyle;
    	const omit_props_names = ["src","size","color","flipH","flipV","rotate","spin"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	const events = getEventsAction();
    	let { src = null } = $$props;
    	let { size = 1 } = $$props;
    	let { color = null } = $$props;
    	let { flipH = null } = $$props;
    	let { flipV = null } = $$props;
    	let { rotate = 0 } = $$props;
    	let { spin = false } = $$props;
    	let path = false;
    	let use = false;
    	let url = false;

    	// size
    	if (Number(size)) size = Number(size);

    	// styles
    	const getStyles = () => {
    		const transform = [];
    		const styles = [];

    		if (size !== null) {
    			const width = typeof size === "string" ? size : `${size * 1.5}rem`;
    			styles.push(['width', width]);
    			styles.push(['height', width]);
    		}

    		styles.push(['fill', color !== null ? color : 'currentColor']);

    		if (flipH) {
    			transform.push("scaleX(-1)");
    		}

    		if (flipV) {
    			transform.push("scaleY(-1)");
    		}

    		if (rotate != 0) {
    			transform.push(`rotate(${rotate}deg)`);
    		}

    		if (transform.length > 0) {
    			styles.push(['transform', transform.join(' ')]);
    			styles.push(['transform-origin', 'center']);
    		}

    		return styles.reduce(
    			(cur, item) => {
    				return `${cur} ${item[0]}:${item[1]};`;
    			},
    			''
    		);
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('src' in $$new_props) $$invalidate(11, src = $$new_props.src);
    		if ('size' in $$new_props) $$invalidate(10, size = $$new_props.size);
    		if ('color' in $$new_props) $$invalidate(12, color = $$new_props.color);
    		if ('flipH' in $$new_props) $$invalidate(13, flipH = $$new_props.flipH);
    		if ('flipV' in $$new_props) $$invalidate(14, flipV = $$new_props.flipV);
    		if ('rotate' in $$new_props) $$invalidate(15, rotate = $$new_props.rotate);
    		if ('spin' in $$new_props) $$invalidate(0, spin = $$new_props.spin);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*src*/ 2048) {
    			//Icon source
    			if (!!src && src.toLowerCase().trim().endsWith('.svg')) {
    				$$invalidate(3, url = src);
    				$$invalidate(1, path = $$invalidate(2, use = false));
    			} else if (!!src && src.toLowerCase().trim().includes('.svg#')) {
    				$$invalidate(2, use = src);
    				$$invalidate(3, url = $$invalidate(1, path = false));
    			} else if (!!src) {
    				$$invalidate(1, path = src);
    				$$invalidate(3, url = $$invalidate(2, use = false));
    			}
    		}

    		if ($$self.$$.dirty & /*spin*/ 1) {
    			// SPIN properties
    			$$invalidate(17, inverse = typeof spin !== "boolean" && spin < 0 ? true : false);
    		}

    		if ($$self.$$.dirty & /*spin*/ 1) {
    			$$invalidate(16, spintime = Math.abs(spin === true ? 2 : spin));
    		}

    		if ($$self.$$.dirty & /*spin, inverse*/ 131073) {
    			$$invalidate(7, spinCW = !!spin && !inverse);
    		}

    		if ($$self.$$.dirty & /*spin, inverse*/ 131073) {
    			$$invalidate(6, spinCCW = !!spin && inverse);
    		}

    		if ($$self.$$.dirty & /*size, color, flipH, flipV, rotate*/ 62464) {
    			$$invalidate(5, style = getStyles());
    		}

    		if ($$self.$$.dirty & /*spin, spintime*/ 65537) {
    			$$invalidate(4, aniStyle = !!spin ? `animation-duration: ${spintime}s` : undefined);
    		}
    	};

    	return [
    		spin,
    		path,
    		use,
    		url,
    		aniStyle,
    		style,
    		spinCCW,
    		spinCW,
    		events,
    		$$restProps,
    		size,
    		src,
    		color,
    		flipH,
    		flipV,
    		rotate,
    		spintime,
    		inverse
    	];
    }

    class Icon extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			src: 11,
    			size: 10,
    			color: 12,
    			flipH: 13,
    			flipV: 14,
    			rotate: 15,
    			spin: 0
    		});
    	}
    }

    /* node_modules\svelte-chota\cmp\Button.svelte generated by Svelte v3.44.2 */

    function create_else_block$3(ctx) {
    	let details;
    	let summary;
    	let t0;

    	let t1_value = (/*dropdown*/ ctx[11] !== true
    	? /*dropdown*/ ctx[11]
    	: '') + "";

    	let t1;
    	let t2;
    	let t3;
    	let card;
    	let dropdownAction_action;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*icon*/ ctx[9] && create_if_block_4(ctx);
    	let if_block1 = /*iconRight*/ ctx[10] && create_if_block_3(ctx);
    	let summary_levels = [/*$$restProps*/ ctx[17]];
    	let summary_data = {};

    	for (let i = 0; i < summary_levels.length; i += 1) {
    		summary_data = assign(summary_data, summary_levels[i]);
    	}

    	card = new Card({
    			props: {
    				style: "z-index:1",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			details = element("details");
    			summary = element("summary");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			create_component(card.$$.fragment);
    			set_attributes(summary, summary_data);
    			toggle_class(summary, "button", 1);
    			toggle_class(summary, "outline", /*outline*/ ctx[1]);
    			toggle_class(summary, "primary", /*primary*/ ctx[2]);
    			toggle_class(summary, "secondary", /*secondary*/ ctx[3]);
    			toggle_class(summary, "dark", /*dark*/ ctx[4]);
    			toggle_class(summary, "error", /*error*/ ctx[5]);
    			toggle_class(summary, "success", /*success*/ ctx[6]);
    			toggle_class(summary, "clear", /*clear*/ ctx[7]);
    			toggle_class(summary, "loading", /*loading*/ ctx[8]);
    			toggle_class(summary, "icon", /*clIcon*/ ctx[15]);
    			toggle_class(summary, "icon-only", /*clIcononly*/ ctx[14]);
    			toggle_class(summary, "svelte-1o5ccdl", true);
    			attr(details, "class", "dropdown");
    		},
    		m(target, anchor) {
    			insert(target, details, anchor);
    			append(details, summary);
    			if (if_block0) if_block0.m(summary, null);
    			append(summary, t0);
    			append(summary, t1);
    			append(summary, t2);
    			if (if_block1) if_block1.m(summary, null);
    			append(details, t3);
    			mount_component(card, details, null);
    			details.open = /*open*/ ctx[0];
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*events*/ ctx[16].call(null, summary)),
    					listen(details, "toggle", /*details_toggle_handler*/ ctx[19]),
    					action_destroyer(dropdownAction_action = dropdownAction.call(null, details, /*autoclose*/ ctx[12]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (/*icon*/ ctx[9]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*icon*/ 512) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(summary, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if ((!current || dirty & /*dropdown*/ 2048) && t1_value !== (t1_value = (/*dropdown*/ ctx[11] !== true
    			? /*dropdown*/ ctx[11]
    			: '') + "")) set_data(t1, t1_value);

    			if (/*iconRight*/ ctx[10]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*iconRight*/ 1024) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(summary, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			set_attributes(summary, summary_data = get_spread_update(summary_levels, [dirty & /*$$restProps*/ 131072 && /*$$restProps*/ ctx[17]]));
    			toggle_class(summary, "button", 1);
    			toggle_class(summary, "outline", /*outline*/ ctx[1]);
    			toggle_class(summary, "primary", /*primary*/ ctx[2]);
    			toggle_class(summary, "secondary", /*secondary*/ ctx[3]);
    			toggle_class(summary, "dark", /*dark*/ ctx[4]);
    			toggle_class(summary, "error", /*error*/ ctx[5]);
    			toggle_class(summary, "success", /*success*/ ctx[6]);
    			toggle_class(summary, "clear", /*clear*/ ctx[7]);
    			toggle_class(summary, "loading", /*loading*/ ctx[8]);
    			toggle_class(summary, "icon", /*clIcon*/ ctx[15]);
    			toggle_class(summary, "icon-only", /*clIcononly*/ ctx[14]);
    			toggle_class(summary, "svelte-1o5ccdl", true);
    			const card_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);

    			if (dirty & /*open*/ 1) {
    				details.open = /*open*/ ctx[0];
    			}

    			if (dropdownAction_action && is_function(dropdownAction_action.update) && dirty & /*autoclose*/ 4096) dropdownAction_action.update.call(null, /*autoclose*/ ctx[12]);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(details);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(card);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (64:0) {#if dropdown === false}
    function create_if_block$3(ctx) {
    	let button;
    	let t0;
    	let t1;
    	let button_type_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*icon*/ ctx[9] && create_if_block_2(ctx);
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], null);
    	let if_block1 = /*iconRight*/ ctx[10] && create_if_block_1$1(ctx);

    	let button_levels = [
    		/*$$restProps*/ ctx[17],
    		{
    			type: button_type_value = /*submit*/ ctx[13] ? 'submit' : 'button'
    		}
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	return {
    		c() {
    			button = element("button");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			set_attributes(button, button_data);
    			toggle_class(button, "button", 1);
    			toggle_class(button, "outline", /*outline*/ ctx[1]);
    			toggle_class(button, "primary", /*primary*/ ctx[2]);
    			toggle_class(button, "secondary", /*secondary*/ ctx[3]);
    			toggle_class(button, "dark", /*dark*/ ctx[4]);
    			toggle_class(button, "error", /*error*/ ctx[5]);
    			toggle_class(button, "success", /*success*/ ctx[6]);
    			toggle_class(button, "clear", /*clear*/ ctx[7]);
    			toggle_class(button, "loading", /*loading*/ ctx[8]);
    			toggle_class(button, "icon", /*clIcon*/ ctx[15]);
    			toggle_class(button, "icon-only", /*clIcononly*/ ctx[14]);
    			toggle_class(button, "svelte-1o5ccdl", true);
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			if (if_block0) if_block0.m(button, null);
    			append(button, t0);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			append(button, t1);
    			if (if_block1) if_block1.m(button, null);
    			if (button.autofocus) button.focus();
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[16].call(null, button));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (/*icon*/ ctx[9]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*icon*/ 512) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(button, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1048576)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[20],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[20], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*iconRight*/ ctx[10]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*iconRight*/ 1024) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(button, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				dirty & /*$$restProps*/ 131072 && /*$$restProps*/ ctx[17],
    				(!current || dirty & /*submit*/ 8192 && button_type_value !== (button_type_value = /*submit*/ ctx[13] ? 'submit' : 'button')) && { type: button_type_value }
    			]));

    			toggle_class(button, "button", 1);
    			toggle_class(button, "outline", /*outline*/ ctx[1]);
    			toggle_class(button, "primary", /*primary*/ ctx[2]);
    			toggle_class(button, "secondary", /*secondary*/ ctx[3]);
    			toggle_class(button, "dark", /*dark*/ ctx[4]);
    			toggle_class(button, "error", /*error*/ ctx[5]);
    			toggle_class(button, "success", /*success*/ ctx[6]);
    			toggle_class(button, "clear", /*clear*/ ctx[7]);
    			toggle_class(button, "loading", /*loading*/ ctx[8]);
    			toggle_class(button, "icon", /*clIcon*/ ctx[15]);
    			toggle_class(button, "icon-only", /*clIcononly*/ ctx[14]);
    			toggle_class(button, "svelte-1o5ccdl", true);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(default_slot, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block0);
    			transition_out(default_slot, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			if (if_block0) if_block0.d();
    			if (default_slot) default_slot.d(detaching);
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (106:4) {#if icon}
    function create_if_block_4(ctx) {
    	let span;
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: { src: /*icon*/ ctx[9], size: "24px" }
    		});

    	return {
    		c() {
    			span = element("span");
    			create_component(icon_1.$$.fragment);
    			attr(span, "class", "lefticon svelte-1o5ccdl");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty & /*icon*/ 512) icon_1_changes.src = /*icon*/ ctx[9];
    			icon_1.$set(icon_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(icon_1);
    		}
    	};
    }

    // (108:4) {#if iconRight}
    function create_if_block_3(ctx) {
    	let span;
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: { src: /*iconRight*/ ctx[10], size: "24px" }
    		});

    	return {
    		c() {
    			span = element("span");
    			create_component(icon_1.$$.fragment);
    			attr(span, "class", "righticon svelte-1o5ccdl");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty & /*iconRight*/ 1024) icon_1_changes.src = /*iconRight*/ ctx[10];
    			icon_1.$set(icon_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(icon_1);
    		}
    	};
    }

    // (110:4) <Card style="z-index:1">
    function create_default_slot$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1048576)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[20],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[20], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    // (83:0) {#if icon}
    function create_if_block_2(ctx) {
    	let span;
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: { src: /*icon*/ ctx[9], size: "24px" }
    		});

    	return {
    		c() {
    			span = element("span");
    			create_component(icon_1.$$.fragment);
    			attr(span, "class", "lefticon svelte-1o5ccdl");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty & /*icon*/ 512) icon_1_changes.src = /*icon*/ ctx[9];
    			icon_1.$set(icon_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(icon_1);
    		}
    	};
    }

    // (85:0) {#if iconRight}
    function create_if_block_1$1(ctx) {
    	let span;
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: { src: /*iconRight*/ ctx[10], size: "24px" }
    		});

    	return {
    		c() {
    			span = element("span");
    			create_component(icon_1.$$.fragment);
    			attr(span, "class", "righticon svelte-1o5ccdl");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty & /*iconRight*/ 1024) icon_1_changes.src = /*iconRight*/ ctx[10];
    			icon_1.$set(icon_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(icon_1);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*dropdown*/ ctx[11] === false) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function dropdownAction(node, param) {
    	let autoclose = param;
    	let button = node.getElementsByTagName('summary')[0];

    	const clickOutside = () => {
    		if (!!node.open) node.open = false;
    	};

    	const clickButton = e => {
    		e.stopPropagation();
    	};

    	const clickInDD = e => {
    		e.stopPropagation();
    		if (autoclose) node.open = false;
    	};

    	node.addEventListener('click', clickInDD);
    	button.addEventListener('click', clickButton);
    	window.addEventListener('click', clickOutside);

    	return {
    		update: param => autoclose = param,
    		destroy: () => {
    			window.removeEventListener('click', clickOutside);
    			node.removeEventListener('click', clickInDD);
    			button.removeEventListener('click', clickButton);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let clIcon;
    	let clIcononly;

    	const omit_props_names = [
    		"outline","primary","secondary","dark","error","success","clear","loading","icon","iconRight","dropdown","open","autoclose","submit"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { outline = null } = $$props;
    	let { primary = null } = $$props;
    	let { secondary = null } = $$props;
    	let { dark = null } = $$props;
    	let { error = null } = $$props;
    	let { success = null } = $$props;
    	let { clear = null } = $$props;
    	let { loading = null } = $$props;
    	let { icon = null } = $$props;
    	let { iconRight = null } = $$props;
    	let { dropdown = false } = $$props;
    	let { open = false } = $$props;
    	let { autoclose = false } = $$props;
    	let { submit = false } = $$props;
    	const events = getEventsAction();
    	const hasSlot = $$props.$$slots && $$props.$$slots !== undefined;

    	function details_toggle_handler() {
    		open = this.open;
    		$$invalidate(0, open);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(22, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('outline' in $$new_props) $$invalidate(1, outline = $$new_props.outline);
    		if ('primary' in $$new_props) $$invalidate(2, primary = $$new_props.primary);
    		if ('secondary' in $$new_props) $$invalidate(3, secondary = $$new_props.secondary);
    		if ('dark' in $$new_props) $$invalidate(4, dark = $$new_props.dark);
    		if ('error' in $$new_props) $$invalidate(5, error = $$new_props.error);
    		if ('success' in $$new_props) $$invalidate(6, success = $$new_props.success);
    		if ('clear' in $$new_props) $$invalidate(7, clear = $$new_props.clear);
    		if ('loading' in $$new_props) $$invalidate(8, loading = $$new_props.loading);
    		if ('icon' in $$new_props) $$invalidate(9, icon = $$new_props.icon);
    		if ('iconRight' in $$new_props) $$invalidate(10, iconRight = $$new_props.iconRight);
    		if ('dropdown' in $$new_props) $$invalidate(11, dropdown = $$new_props.dropdown);
    		if ('open' in $$new_props) $$invalidate(0, open = $$new_props.open);
    		if ('autoclose' in $$new_props) $$invalidate(12, autoclose = $$new_props.autoclose);
    		if ('submit' in $$new_props) $$invalidate(13, submit = $$new_props.submit);
    		if ('$$scope' in $$new_props) $$invalidate(20, $$scope = $$new_props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon, iconRight*/ 1536) {
    			$$invalidate(15, clIcon = (icon !== null || iconRight !== null) && hasSlot);
    		}

    		if ($$self.$$.dirty & /*dropdown, icon*/ 2560) {
    			$$invalidate(14, clIcononly = dropdown
    			? icon !== null && dropdown === true
    			: icon !== null && !hasSlot);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		open,
    		outline,
    		primary,
    		secondary,
    		dark,
    		error,
    		success,
    		clear,
    		loading,
    		icon,
    		iconRight,
    		dropdown,
    		autoclose,
    		submit,
    		clIcononly,
    		clIcon,
    		events,
    		$$restProps,
    		slots,
    		details_toggle_handler,
    		$$scope
    	];
    }

    class Button extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			outline: 1,
    			primary: 2,
    			secondary: 3,
    			dark: 4,
    			error: 5,
    			success: 6,
    			clear: 7,
    			loading: 8,
    			icon: 9,
    			iconRight: 10,
    			dropdown: 11,
    			open: 0,
    			autoclose: 12,
    			submit: 13
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules\svelte-chota\cmp\Details.svelte generated by Svelte v3.44.2 */
    const get_summary_slot_changes = dirty => ({});
    const get_summary_slot_context = ctx => ({});

    function create_fragment$4(ctx) {
    	let details;
    	let summary;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const summary_slot_template = /*#slots*/ ctx[5].summary;
    	const summary_slot = create_slot(summary_slot_template, ctx, /*$$scope*/ ctx[4], get_summary_slot_context);
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	let details_levels = [/*$$restProps*/ ctx[3]];
    	let details_data = {};

    	for (let i = 0; i < details_levels.length; i += 1) {
    		details_data = assign(details_data, details_levels[i]);
    	}

    	return {
    		c() {
    			details = element("details");
    			summary = element("summary");
    			if (summary_slot) summary_slot.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			attr(summary, "class", "svelte-4ixea4");
    			set_attributes(details, details_data);
    			toggle_class(details, "dropdown", /*dropdown*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, details, anchor);
    			append(details, summary);

    			if (summary_slot) {
    				summary_slot.m(summary, null);
    			}

    			append(details, t);

    			if (default_slot) {
    				default_slot.m(details, null);
    			}

    			details.open = /*open*/ ctx[0];
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*events*/ ctx[2].call(null, details)),
    					listen(details, "toggle", /*details_toggle_handler*/ ctx[6])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (summary_slot) {
    				if (summary_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						summary_slot,
    						summary_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(summary_slot_template, /*$$scope*/ ctx[4], dirty, get_summary_slot_changes),
    						get_summary_slot_context
    					);
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(details, details_data = get_spread_update(details_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));

    			if (dirty & /*open*/ 1) {
    				details.open = /*open*/ ctx[0];
    			}

    			toggle_class(details, "dropdown", /*dropdown*/ ctx[1]);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(summary_slot, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(summary_slot, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(details);
    			if (summary_slot) summary_slot.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const omit_props_names = ["dropdown","open"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { dropdown = false } = $$props;
    	let { open = false } = $$props;
    	const events = getEventsAction();

    	function details_toggle_handler() {
    		open = this.open;
    		$$invalidate(0, open);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('dropdown' in $$new_props) $$invalidate(1, dropdown = $$new_props.dropdown);
    		if ('open' in $$new_props) $$invalidate(0, open = $$new_props.open);
    		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	return [open, dropdown, events, $$restProps, $$scope, slots, details_toggle_handler];
    }

    class Details extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { dropdown: 1, open: 0 });
    	}
    }

    /* node_modules\svelte-chota\cmp\Input.svelte generated by Svelte v3.44.2 */

    function create_else_block$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;
    	let input_levels = [{ type: /*type*/ ctx[1] }, /*$$restProps*/ ctx[6], { value: /*value*/ ctx[0] }];
    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	return {
    		c() {
    			input = element("input");
    			set_attributes(input, input_data);
    			toggle_class(input, "error", /*error*/ ctx[2]);
    			toggle_class(input, "success", /*success*/ ctx[3]);
    			toggle_class(input, "svelte-ovucoa", true);
    		},
    		m(target, anchor) {
    			insert(target, input, anchor);
    			input.value = input_data.value;
    			if (input.autofocus) input.focus();

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*events*/ ctx[4].call(null, input)),
    					listen(input, "input", /*onInput*/ ctx[5])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*type*/ 2 && { type: /*type*/ ctx[1] },
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0] && { value: /*value*/ ctx[0] }
    			]));

    			if ('value' in input_data) {
    				input.value = input_data.value;
    			}

    			toggle_class(input, "error", /*error*/ ctx[2]);
    			toggle_class(input, "success", /*success*/ ctx[3]);
    			toggle_class(input, "svelte-ovucoa", true);
    		},
    		d(detaching) {
    			if (detaching) detach(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (52:0) {#if type === 'textarea'}
    function create_if_block$2(ctx) {
    	let textarea_1;
    	let mounted;
    	let dispose;
    	let textarea_1_levels = [/*$$restProps*/ ctx[6], { value: /*value*/ ctx[0] }];
    	let textarea_1_data = {};

    	for (let i = 0; i < textarea_1_levels.length; i += 1) {
    		textarea_1_data = assign(textarea_1_data, textarea_1_levels[i]);
    	}

    	return {
    		c() {
    			textarea_1 = element("textarea");
    			set_attributes(textarea_1, textarea_1_data);
    			toggle_class(textarea_1, "error", /*error*/ ctx[2]);
    			toggle_class(textarea_1, "success", /*success*/ ctx[3]);
    		},
    		m(target, anchor) {
    			insert(target, textarea_1, anchor);
    			if (textarea_1.autofocus) textarea_1.focus();

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*events*/ ctx[4].call(null, textarea_1)),
    					listen(textarea_1, "input", /*onInput*/ ctx[5])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			set_attributes(textarea_1, textarea_1_data = get_spread_update(textarea_1_levels, [
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				dirty & /*value*/ 1 && { value: /*value*/ ctx[0] }
    			]));

    			toggle_class(textarea_1, "error", /*error*/ ctx[2]);
    			toggle_class(textarea_1, "success", /*success*/ ctx[3]);
    		},
    		d(detaching) {
    			if (detaching) detach(textarea_1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[1] === 'textarea') return create_if_block$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"value","type","error","success","password","number","textarea","color","date","range"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { value = '' } = $$props;
    	let { type = 'text' } = $$props;
    	let { error = null } = $$props;
    	let { success = null } = $$props;
    	let { password = false } = $$props;
    	let { number = false } = $$props;
    	let { textarea = false } = $$props;
    	let { color = false } = $$props;
    	let { date = false } = $$props;
    	let { range = false } = $$props;
    	const events = getEventsAction();

    	const onInput = e => {
    		const type = e.target.type;
    		const val = e.target.value;
    		if (type === 'number' || type === 'range') $$invalidate(0, value = val === '' ? undefined : +val); else $$invalidate(0, value = val);
    	};

    	let getState = getContext('field:state');

    	if (getState) {
    		getState.subscribe(state => {
    			if (state === 'error') $$invalidate(2, error = true); else if (state === 'success') $$invalidate(3, success = true); else $$invalidate(3, success = $$invalidate(2, error = false));
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('type' in $$new_props) $$invalidate(1, type = $$new_props.type);
    		if ('error' in $$new_props) $$invalidate(2, error = $$new_props.error);
    		if ('success' in $$new_props) $$invalidate(3, success = $$new_props.success);
    		if ('password' in $$new_props) $$invalidate(7, password = $$new_props.password);
    		if ('number' in $$new_props) $$invalidate(8, number = $$new_props.number);
    		if ('textarea' in $$new_props) $$invalidate(9, textarea = $$new_props.textarea);
    		if ('color' in $$new_props) $$invalidate(10, color = $$new_props.color);
    		if ('date' in $$new_props) $$invalidate(11, date = $$new_props.date);
    		if ('range' in $$new_props) $$invalidate(12, range = $$new_props.range);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*password*/ 128) {
    			if (password) $$invalidate(1, type = 'password');
    		}

    		if ($$self.$$.dirty & /*number*/ 256) {
    			if (number) $$invalidate(1, type = 'number');
    		}

    		if ($$self.$$.dirty & /*textarea*/ 512) {
    			if (textarea) $$invalidate(1, type = 'textarea');
    		}

    		if ($$self.$$.dirty & /*color*/ 1024) {
    			if (color) $$invalidate(1, type = 'color');
    		}

    		if ($$self.$$.dirty & /*date*/ 2048) {
    			if (date) $$invalidate(1, type = 'date');
    		}

    		if ($$self.$$.dirty & /*range*/ 4096) {
    			if (range) $$invalidate(1, type = 'range');
    		}
    	};

    	return [
    		value,
    		type,
    		error,
    		success,
    		events,
    		onInput,
    		$$restProps,
    		password,
    		number,
    		textarea,
    		color,
    		date,
    		range
    	];
    }

    class Input extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			value: 0,
    			type: 1,
    			error: 2,
    			success: 3,
    			password: 7,
    			number: 8,
    			textarea: 9,
    			color: 10,
    			date: 11,
    			range: 12
    		});
    	}
    }

    /* node_modules\svelte-chota\cmp\Field.svelte generated by Svelte v3.44.2 */

    function create_if_block_1(ctx) {
    	let label_1;
    	let t;

    	return {
    		c() {
    			label_1 = element("label");
    			t = text(/*label*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, label_1, anchor);
    			append(label_1, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data(t, /*label*/ ctx[1]);
    		},
    		d(detaching) {
    			if (detaching) detach(label_1);
    		}
    	};
    }

    // (43:1) {:else}
    function create_else_block$1(ctx) {
    	let p;

    	return {
    		c() {
    			p = element("p");
    			p.textContent = " ";
    			attr(p, "class", "message svelte-3n5xjn");
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(p);
    		}
    	};
    }

    // (41:1) {#if message}
    function create_if_block$1(ctx) {
    	let p;
    	let t;

    	return {
    		c() {
    			p = element("p");
    			t = text(/*message*/ ctx[5]);
    			attr(p, "class", "message svelte-3n5xjn");
    			toggle_class(p, "text-error", /*error*/ ctx[2]);
    			toggle_class(p, "text-success", /*success*/ ctx[3]);
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    			append(p, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*message*/ 32) set_data(t, /*message*/ ctx[5]);

    			if (dirty & /*error*/ 4) {
    				toggle_class(p, "text-error", /*error*/ ctx[2]);
    			}

    			if (dirty & /*success*/ 8) {
    				toggle_class(p, "text-success", /*success*/ ctx[3]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(p);
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	let div;
    	let t0;
    	let p;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*label*/ ctx[1] && create_if_block_1(ctx);
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	function select_block_type(ctx, dirty) {
    		if (/*message*/ ctx[5]) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);
    	let div_levels = [/*$$restProps*/ ctx[7]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	return {
    		c() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			p = element("p");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if_block1.c();
    			attr(p, "class", "svelte-3n5xjn");
    			toggle_class(p, "grouped", /*grouped*/ ctx[0]);
    			toggle_class(p, "gapless", /*gapless*/ ctx[4]);
    			set_attributes(div, div_data);
    			toggle_class(div, "nomessage", !/*message*/ ctx[5]);
    			toggle_class(div, "svelte-3n5xjn", true);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t0);
    			append(div, p);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			append(div, t1);
    			if_block1.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*events*/ ctx[6].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (/*label*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*grouped*/ 1) {
    				toggle_class(p, "grouped", /*grouped*/ ctx[0]);
    			}

    			if (dirty & /*gapless*/ 16) {
    				toggle_class(p, "gapless", /*gapless*/ ctx[4]);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]]));
    			toggle_class(div, "nomessage", !/*message*/ ctx[5]);
    			toggle_class(div, "svelte-3n5xjn", true);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block0) if_block0.d();
    			if (default_slot) default_slot.d(detaching);
    			if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const omit_props_names = ["label","error","success","grouped","gapless"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { label = false } = $$props;
    	let { error = false } = $$props;
    	let { success = false } = $$props;
    	let { grouped = false } = $$props;
    	let { gapless = false } = $$props;
    	const events = getEventsAction();
    	const state = writable('');
    	let message = false;
    	setContext('field:state', state);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('label' in $$new_props) $$invalidate(1, label = $$new_props.label);
    		if ('error' in $$new_props) $$invalidate(2, error = $$new_props.error);
    		if ('success' in $$new_props) $$invalidate(3, success = $$new_props.success);
    		if ('grouped' in $$new_props) $$invalidate(0, grouped = $$new_props.grouped);
    		if ('gapless' in $$new_props) $$invalidate(4, gapless = $$new_props.gapless);
    		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*gapless*/ 16) {
    			if (gapless) $$invalidate(0, grouped = true);
    		}

    		if ($$self.$$.dirty & /*error, success*/ 12) {
    			if (typeof error === 'string') {
    				state.set('error');
    				$$invalidate(5, message = error);
    			} else if (typeof success === 'string') {
    				state.set('success');
    				$$invalidate(5, message = success);
    			} else {
    				state.set('');
    				$$invalidate(5, message = false);
    			}
    		}
    	};

    	return [
    		grouped,
    		label,
    		error,
    		success,
    		gapless,
    		message,
    		events,
    		$$restProps,
    		$$scope,
    		slots
    	];
    }

    class Field extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			label: 1,
    			error: 2,
    			success: 3,
    			grouped: 0,
    			gapless: 4
    		});
    	}
    }

    /* src\components\Loading.svelte generated by Svelte v3.44.2 */

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			attr(div0, "class", "lds-dual-ring svelte-mmshxb");
    			attr(div1, "class", "loading svelte-mmshxb");
    			attr(div1, "style", /*mainStyle*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*mainStyle*/ 1) {
    				attr(div1, "style", /*mainStyle*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div1);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { mainStyle = "" } = $$props;

    	$$self.$$set = $$props => {
    		if ('mainStyle' in $$props) $$invalidate(0, mainStyle = $$props.mainStyle);
    	};

    	return [mainStyle];
    }

    class Loading extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { mainStyle: 0 });
    	}
    }

    /* src\components\DemoPage.svelte generated by Svelte v3.44.2 */

    function create_else_block(ctx) {
    	let loading;
    	let current;
    	loading = new Loading({});

    	return {
    		c() {
    			create_component(loading.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(loading, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(loading.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(loading.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(loading, detaching);
    		}
    	};
    }

    // (485:2) {#if $loaded}
    function create_if_block(ctx) {
    	let div;
    	let row;
    	let t;
    	let container;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			}
    		});

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			div = element("div");
    			create_component(row.$$.fragment);
    			t = space();
    			create_component(container.$$.fragment);
    			attr(div, "class", "main-container svelte-qpq4mu");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(row, div, null);
    			insert(target, t, anchor);
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(row.$$.fragment, local);
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(row);
    			if (detaching) detach(t);
    			destroy_component(container, detaching);
    		}
    	};
    }

    // (493:14) <Button success on:click={wallet_getSdkVersion}>
    function create_default_slot_121(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Get SDK version");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (492:12) <Field>
    function create_default_slot_120(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_121] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*wallet_getSdkVersion*/ ctx[2]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (495:12) <Field>
    function create_default_slot_119(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "wallet_getSdkVersion_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (490:10) <Details>
    function create_default_slot_118(ctx) {
    	let field0;
    	let t;
    	let field1;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_120] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_119] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t = space();
    			create_component(field1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(field1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t);
    			destroy_component(field1, detaching);
    		}
    	};
    }

    // (491:12) 
    function create_summary_slot_19(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "wallet_getSdkVersion";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (503:14) <Button success on:click={wallet_requestPermissions}>
    function create_default_slot_117(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Request permissions");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (502:12) <Field>
    function create_default_slot_116(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_117] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*wallet_requestPermissions*/ ctx[3]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (507:12) <Field>
    function create_default_slot_115(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "wallet_requestPermissions_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (500:10) <Details>
    function create_default_slot_114(ctx) {
    	let field0;
    	let t;
    	let field1;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_116] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_115] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t = space();
    			create_component(field1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(field1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t);
    			destroy_component(field1, detaching);
    		}
    	};
    }

    // (501:12) 
    function create_summary_slot_18(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "wallet_requestPermissions";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (515:14) <Button success on:click={wallet_getPermissions}>
    function create_default_slot_113(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Get permissions");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (514:12) <Field>
    function create_default_slot_112(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_113] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*wallet_getPermissions*/ ctx[4]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (519:12) <Field>
    function create_default_slot_111(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "wallet_getPermissions_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (512:10) <Details>
    function create_default_slot_110(ctx) {
    	let field0;
    	let t;
    	let field1;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_112] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_111] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t = space();
    			create_component(field1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(field1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t);
    			destroy_component(field1, detaching);
    		}
    	};
    }

    // (513:12) 
    function create_summary_slot_17(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "wallet_getPermissions";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (527:14) <Button success on:click={ton_account}>
    function create_default_slot_109(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Get current account");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (526:12) <Field>
    function create_default_slot_108(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_109] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_account*/ ctx[5]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (529:12) <Field>
    function create_default_slot_107(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_account_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (524:10) <Details>
    function create_default_slot_106(ctx) {
    	let field0;
    	let t;
    	let field1;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_108] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_107] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t = space();
    			create_component(field1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(field1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t);
    			destroy_component(field1, detaching);
    		}
    	};
    }

    // (525:12) 
    function create_summary_slot_16(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_account";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (537:14) <Button success on:click={ton_endpoint}>
    function create_default_slot_105(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Get current endpoint");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (536:12) <Field>
    function create_default_slot_104(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_105] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_endpoint*/ ctx[6]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (539:12) <Field>
    function create_default_slot_103(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_endpoint_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (534:10) <Details>
    function create_default_slot_102(ctx) {
    	let field0;
    	let t;
    	let field1;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_104] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_103] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t = space();
    			create_component(field1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(field1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t);
    			destroy_component(field1, detaching);
    		}
    	};
    }

    // (535:12) 
    function create_summary_slot_15(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_endpoint";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (546:12) <Field label="Destination">
    function create_default_slot_101(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_sendTransaction_destination" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "You can select another account in your wallet and send between own\n                accounts.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (553:12) <Field label="Token">
    function create_default_slot_100(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: {
    				id: "ton_sendTransaction_token",
    				value: "native"
    			}
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "You can send \"native\" token or specify a root token address.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (557:12) <Field label="Amount">
    function create_default_slot_99(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: {
    				id: "ton_sendTransaction_amount",
    				type: "number"
    			}
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "You can use decimal number.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (561:12) <Field label="Message">
    function create_default_slot_98(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_sendTransaction_message" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "This field is not required, but can be used for providing order ID or\n                some additional information.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (569:14) <Button success on:click={ton_sendTransaction}>
    function create_default_slot_97(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Ton send transaction");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (568:12) <Field>
    function create_default_slot_96(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_97] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_sendTransaction*/ ctx[7]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (573:12) <Field>
    function create_default_slot_95(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_sendTransaction_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (544:10) <Details>
    function create_default_slot_94(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let t2;
    	let field3;
    	let t3;
    	let field4;
    	let t4;
    	let field5;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Destination",
    				$$slots: { default: [create_default_slot_101] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				label: "Token",
    				$$slots: { default: [create_default_slot_100] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				label: "Amount",
    				$$slots: { default: [create_default_slot_99] },
    				$$scope: { ctx }
    			}
    		});

    	field3 = new Field({
    			props: {
    				label: "Message",
    				$$slots: { default: [create_default_slot_98] },
    				$$scope: { ctx }
    			}
    		});

    	field4 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_96] },
    				$$scope: { ctx }
    			}
    		});

    	field5 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_95] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    			t2 = space();
    			create_component(field3.$$.fragment);
    			t3 = space();
    			create_component(field4.$$.fragment);
    			t4 = space();
    			create_component(field5.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(field3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(field4, target, anchor);
    			insert(target, t4, anchor);
    			mount_component(field5, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    			const field3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field3_changes.$$scope = { dirty, ctx };
    			}

    			field3.$set(field3_changes);
    			const field4_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field4_changes.$$scope = { dirty, ctx };
    			}

    			field4.$set(field4_changes);
    			const field5_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field5_changes.$$scope = { dirty, ctx };
    			}

    			field5.$set(field5_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			transition_in(field4.$$.fragment, local);
    			transition_in(field5.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			transition_out(field4.$$.fragment, local);
    			transition_out(field5.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(field3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(field4, detaching);
    			if (detaching) detach(t4);
    			destroy_component(field5, detaching);
    		}
    	};
    }

    // (545:12) 
    function create_summary_slot_14(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_sendTransaction";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (580:12) <Field label="To">
    function create_default_slot_93(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_sendRawTransaction_to" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Specify destination address.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (584:12) <Field label="Amount">
    function create_default_slot_92(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: {
    				id: "ton_sendRawTransaction_amount",
    				type: "number"
    			}
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "You can use decimal number.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (588:12) <Field label="Data">
    function create_default_slot_91(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_sendRawTransaction_data" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Data to send with transaction.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (592:12) <Field label="Data type">
    function create_default_slot_90(ctx) {
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;

    	return {
    		c() {
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "boc";
    			option1 = element("option");
    			option1.textContent = "hex";
    			option2 = element("option");
    			option2.textContent = "base64";
    			option3 = element("option");
    			option3.textContent = "text";
    			option0.__value = "boc";
    			option0.value = option0.__value;
    			option1.__value = "hex";
    			option1.value = option1.__value;
    			option2.__value = "base64";
    			option2.value = option2.__value;
    			option3.__value = "text";
    			option3.value = option3.__value;
    			attr(select, "id", "ton_sendRawTransaction_dataType");
    		},
    		m(target, anchor) {
    			insert(target, select, anchor);
    			append(select, option0);
    			append(select, option1);
    			append(select, option2);
    			append(select, option3);
    		},
    		d(detaching) {
    			if (detaching) detach(select);
    		}
    	};
    }

    // (600:12) <Field label="State init">
    function create_default_slot_89(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_sendRawTransaction_stateInit" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Need to use preformed boc";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (605:14) <Button success on:click={ton_sendRawTransaction}>
    function create_default_slot_88(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Ton send raw transaction");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (604:12) <Field>
    function create_default_slot_87(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_88] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_sendRawTransaction*/ ctx[8]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (609:12) <Field>
    function create_default_slot_86(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_sendRawTransaction_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (578:10) <Details>
    function create_default_slot_85(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let t2;
    	let field3;
    	let t3;
    	let field4;
    	let t4;
    	let field5;
    	let t5;
    	let field6;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "To",
    				$$slots: { default: [create_default_slot_93] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				label: "Amount",
    				$$slots: { default: [create_default_slot_92] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				label: "Data",
    				$$slots: { default: [create_default_slot_91] },
    				$$scope: { ctx }
    			}
    		});

    	field3 = new Field({
    			props: {
    				label: "Data type",
    				$$slots: { default: [create_default_slot_90] },
    				$$scope: { ctx }
    			}
    		});

    	field4 = new Field({
    			props: {
    				label: "State init",
    				$$slots: { default: [create_default_slot_89] },
    				$$scope: { ctx }
    			}
    		});

    	field5 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_87] },
    				$$scope: { ctx }
    			}
    		});

    	field6 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_86] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    			t2 = space();
    			create_component(field3.$$.fragment);
    			t3 = space();
    			create_component(field4.$$.fragment);
    			t4 = space();
    			create_component(field5.$$.fragment);
    			t5 = space();
    			create_component(field6.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(field3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(field4, target, anchor);
    			insert(target, t4, anchor);
    			mount_component(field5, target, anchor);
    			insert(target, t5, anchor);
    			mount_component(field6, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    			const field3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field3_changes.$$scope = { dirty, ctx };
    			}

    			field3.$set(field3_changes);
    			const field4_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field4_changes.$$scope = { dirty, ctx };
    			}

    			field4.$set(field4_changes);
    			const field5_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field5_changes.$$scope = { dirty, ctx };
    			}

    			field5.$set(field5_changes);
    			const field6_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field6_changes.$$scope = { dirty, ctx };
    			}

    			field6.$set(field6_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			transition_in(field4.$$.fragment, local);
    			transition_in(field5.$$.fragment, local);
    			transition_in(field6.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			transition_out(field4.$$.fragment, local);
    			transition_out(field5.$$.fragment, local);
    			transition_out(field6.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(field3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(field4, detaching);
    			if (detaching) detach(t4);
    			destroy_component(field5, detaching);
    			if (detaching) detach(t5);
    			destroy_component(field6, detaching);
    		}
    	};
    }

    // (579:12) 
    function create_summary_slot_13(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_sendRawTransaction";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (616:12) <Field label="Data">
    function create_default_slot_84(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;
    	input = new Input({ props: { id: "ton_signMessage_data" } });

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Specify data for the signing process.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (621:14) <Button success on:click={ton_signMessage}>
    function create_default_slot_83(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Sign message");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (620:12) <Field>
    function create_default_slot_82(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_83] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_signMessage*/ ctx[9]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (623:12) <Field>
    function create_default_slot_81(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_signMessage_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (614:10) <Details>
    function create_default_slot_80(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Data",
    				$$slots: { default: [create_default_slot_84] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_82] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_81] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (615:12) 
    function create_summary_slot_12(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_signMessage";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (631:14) <Button success on:click={ton_getNaclBoxPublicKey}>
    function create_default_slot_79(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Get nacl box public key");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (630:12) <Field>
    function create_default_slot_78(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_79] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_getNaclBoxPublicKey*/ ctx[10]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (635:12) <Field>
    function create_default_slot_77(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_getNaclBoxPublicKey_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (628:10) <Details>
    function create_default_slot_76(ctx) {
    	let field0;
    	let t;
    	let field1;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_78] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_77] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t = space();
    			create_component(field1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(field1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t);
    			destroy_component(field1, detaching);
    		}
    	};
    }

    // (629:12) 
    function create_summary_slot_11(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_getNaclBoxPublicKey";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (642:12) <Field label="Data">
    function create_default_slot_75(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;
    	input = new Input({ props: { id: "ton_getSignature_data" } });

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Specify data for which need to receive signature.";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (647:14) <Button success on:click={ton_getSignature}>
    function create_default_slot_74(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Get signature");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (646:12) <Field>
    function create_default_slot_73(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_74] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_getSignature*/ ctx[11]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (649:12) <Field>
    function create_default_slot_72(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_getSignature_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (640:10) <Details>
    function create_default_slot_71(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Data",
    				$$slots: { default: [create_default_slot_75] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_73] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_72] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (641:12) 
    function create_summary_slot_10(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_getSignature";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (656:12) <Field label="Length">
    function create_default_slot_70(ctx) {
    	let input;
    	let current;

    	input = new Input({
    			props: {
    				id: "ton_crypto_generate_random_bytes_length",
    				type: "number"
    			}
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (660:14) <Button success on:click={ton_crypto_generate_random_bytes}>
    function create_default_slot_69(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Crypto generate random bytes");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (659:12) <Field>
    function create_default_slot_68(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_69] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_crypto_generate_random_bytes*/ ctx[12]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (664:12) <Field>
    function create_default_slot_67(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_crypto_generate_random_bytes_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (654:10) <Details>
    function create_default_slot_66(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Length",
    				$$slots: { default: [create_default_slot_70] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_68] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_67] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (655:12) 
    function create_summary_slot_9(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_crypto_generate_random_bytes";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (671:12) <Field label="Decrypted">
    function create_default_slot_65(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_encryptMessage_decrypted" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Message that you want to encrypt";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (675:12) <Field label="Nonce">
    function create_default_slot_64(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_encryptMessage_nonce" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Maybe convenient to get this from ton_crypto_generate_random_bytes";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (679:12) <Field label="Their public">
    function create_default_slot_63(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_encryptMessage_their_public" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Public key of counterparty";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (684:14) <Button success on:click={ton_encryptMessage}>
    function create_default_slot_62(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Encrypt message");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (683:12) <Field>
    function create_default_slot_61(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_62] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_encryptMessage*/ ctx[13]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (686:12) <Field>
    function create_default_slot_60(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_encryptMessage_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (669:10) <Details>
    function create_default_slot_59(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let t2;
    	let field3;
    	let t3;
    	let field4;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Decrypted",
    				$$slots: { default: [create_default_slot_65] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				label: "Nonce",
    				$$slots: { default: [create_default_slot_64] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				label: "Their public",
    				$$slots: { default: [create_default_slot_63] },
    				$$scope: { ctx }
    			}
    		});

    	field3 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_61] },
    				$$scope: { ctx }
    			}
    		});

    	field4 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_60] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    			t2 = space();
    			create_component(field3.$$.fragment);
    			t3 = space();
    			create_component(field4.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(field3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(field4, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    			const field3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field3_changes.$$scope = { dirty, ctx };
    			}

    			field3.$set(field3_changes);
    			const field4_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field4_changes.$$scope = { dirty, ctx };
    			}

    			field4.$set(field4_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			transition_in(field4.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			transition_out(field4.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(field3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(field4, detaching);
    		}
    	};
    }

    // (670:12) 
    function create_summary_slot_8(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_encryptMessage";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (693:12) <Field label="Encrypted">
    function create_default_slot_58(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_decryptMessage_encrypted" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Message that you want to decrypt";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (697:12) <Field label="Nonce">
    function create_default_slot_57(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_decryptMessage_nonce" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "You must to use the same nonce as for ton_encryptMessage";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (701:12) <Field label="Their public">
    function create_default_slot_56(ctx) {
    	let input;
    	let t0;
    	let p;
    	let current;

    	input = new Input({
    			props: { id: "ton_decryptMessage_their_public" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = "Public key of counterparty";
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(p);
    		}
    	};
    }

    // (706:14) <Button success on:click={ton_decryptMessage}>
    function create_default_slot_55(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Decrypt message");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (705:12) <Field>
    function create_default_slot_54(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_55] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_decryptMessage*/ ctx[14]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (708:12) <Field>
    function create_default_slot_53(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_decryptMessage_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (691:10) <Details>
    function create_default_slot_52(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let t2;
    	let field3;
    	let t3;
    	let field4;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Encrypted",
    				$$slots: { default: [create_default_slot_58] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				label: "Nonce",
    				$$slots: { default: [create_default_slot_57] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				label: "Their public",
    				$$slots: { default: [create_default_slot_56] },
    				$$scope: { ctx }
    			}
    		});

    	field3 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_54] },
    				$$scope: { ctx }
    			}
    		});

    	field4 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_53] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    			t2 = space();
    			create_component(field3.$$.fragment);
    			t3 = space();
    			create_component(field4.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(field3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(field4, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    			const field3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field3_changes.$$scope = { dirty, ctx };
    			}

    			field3.$set(field3_changes);
    			const field4_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field4_changes.$$scope = { dirty, ctx };
    			}

    			field4.$set(field4_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			transition_in(field4.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			transition_out(field4.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(field3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(field4, detaching);
    		}
    	};
    }

    // (692:12) 
    function create_summary_slot_7(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_decryptMessage";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (715:12) <Field label="Name">
    function create_default_slot_51(ctx) {
    	let input;
    	let current;
    	input = new Input({ props: { id: "wallet_watchAsset_name" } });

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (718:12) <Field label="Symbol">
    function create_default_slot_50(ctx) {
    	let input;
    	let current;

    	input = new Input({
    			props: { id: "wallet_watchAsset_symbol" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (721:12) <Field label="Decimals">
    function create_default_slot_49(ctx) {
    	let input;
    	let current;

    	input = new Input({
    			props: {
    				id: "wallet_watchAsset_decimals",
    				type: "number"
    			}
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (724:12) <Field label="Address">
    function create_default_slot_48(ctx) {
    	let input;
    	let current;

    	input = new Input({
    			props: { id: "wallet_watchAsset_address" }
    		});

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (727:12) <Field label="Icon">
    function create_default_slot_47(ctx) {
    	let input;
    	let current;
    	input = new Input({ props: { id: "wallet_watchAsset_icon" } });

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (730:12) <Field label="Type">
    function create_default_slot_46(ctx) {
    	let select;
    	let option0;
    	let option1;
    	let option2;

    	return {
    		c() {
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Jetton";
    			option1 = element("option");
    			option1.textContent = "NFT";
    			option2 = element("option");
    			option2.textContent = "DNS";
    			option0.__value = "74";
    			option0.value = option0.__value;
    			option1.__value = "64";
    			option1.value = option1.__value;
    			option2.__value = "81";
    			option2.value = option2.__value;
    			attr(select, "id", "wallet_watchAsset_type");
    		},
    		m(target, anchor) {
    			insert(target, select, anchor);
    			append(select, option0);
    			append(select, option1);
    			append(select, option2);
    		},
    		d(detaching) {
    			if (detaching) detach(select);
    		}
    	};
    }

    // (738:14) <Button success on:click={wallet_watchAsset}>
    function create_default_slot_45(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Wallet watch asset");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (737:12) <Field>
    function create_default_slot_44(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_45] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*wallet_watchAsset*/ ctx[15]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (740:12) <Field>
    function create_default_slot_43(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "wallet_watchAsset_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (713:10) <Details>
    function create_default_slot_42(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let t2;
    	let field3;
    	let t3;
    	let field4;
    	let t4;
    	let field5;
    	let t5;
    	let field6;
    	let t6;
    	let field7;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Name",
    				$$slots: { default: [create_default_slot_51] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				label: "Symbol",
    				$$slots: { default: [create_default_slot_50] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				label: "Decimals",
    				$$slots: { default: [create_default_slot_49] },
    				$$scope: { ctx }
    			}
    		});

    	field3 = new Field({
    			props: {
    				label: "Address",
    				$$slots: { default: [create_default_slot_48] },
    				$$scope: { ctx }
    			}
    		});

    	field4 = new Field({
    			props: {
    				label: "Icon",
    				$$slots: { default: [create_default_slot_47] },
    				$$scope: { ctx }
    			}
    		});

    	field5 = new Field({
    			props: {
    				label: "Type",
    				$$slots: { default: [create_default_slot_46] },
    				$$scope: { ctx }
    			}
    		});

    	field6 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_44] },
    				$$scope: { ctx }
    			}
    		});

    	field7 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_43] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    			t2 = space();
    			create_component(field3.$$.fragment);
    			t3 = space();
    			create_component(field4.$$.fragment);
    			t4 = space();
    			create_component(field5.$$.fragment);
    			t5 = space();
    			create_component(field6.$$.fragment);
    			t6 = space();
    			create_component(field7.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(field3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(field4, target, anchor);
    			insert(target, t4, anchor);
    			mount_component(field5, target, anchor);
    			insert(target, t5, anchor);
    			mount_component(field6, target, anchor);
    			insert(target, t6, anchor);
    			mount_component(field7, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    			const field3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field3_changes.$$scope = { dirty, ctx };
    			}

    			field3.$set(field3_changes);
    			const field4_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field4_changes.$$scope = { dirty, ctx };
    			}

    			field4.$set(field4_changes);
    			const field5_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field5_changes.$$scope = { dirty, ctx };
    			}

    			field5.$set(field5_changes);
    			const field6_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field6_changes.$$scope = { dirty, ctx };
    			}

    			field6.$set(field6_changes);
    			const field7_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field7_changes.$$scope = { dirty, ctx };
    			}

    			field7.$set(field7_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			transition_in(field3.$$.fragment, local);
    			transition_in(field4.$$.fragment, local);
    			transition_in(field5.$$.fragment, local);
    			transition_in(field6.$$.fragment, local);
    			transition_in(field7.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			transition_out(field3.$$.fragment, local);
    			transition_out(field4.$$.fragment, local);
    			transition_out(field5.$$.fragment, local);
    			transition_out(field6.$$.fragment, local);
    			transition_out(field7.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(field3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(field4, detaching);
    			if (detaching) detach(t4);
    			destroy_component(field5, detaching);
    			if (detaching) detach(t5);
    			destroy_component(field6, detaching);
    			if (detaching) detach(t6);
    			destroy_component(field7, detaching);
    		}
    	};
    }

    // (714:12) 
    function create_summary_slot_6(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "wallet_watchAsset";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (747:12) <Field label="Address">
    function create_default_slot_41(ctx) {
    	let input;
    	let current;
    	input = new Input({ props: { id: "ton_subscribe_address" } });

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (751:14) <Button success on:click={ton_subscribe}>
    function create_default_slot_40(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Subscribe by address");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (750:12) <Field>
    function create_default_slot_39(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_40] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_subscribe*/ ctx[16]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (753:12) <Field>
    function create_default_slot_38(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_subscribe_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (745:10) <Details>
    function create_default_slot_37(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Address",
    				$$slots: { default: [create_default_slot_41] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_39] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_38] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (746:12) 
    function create_summary_slot_5(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_subscribe";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (760:12) <Field label="Address">
    function create_default_slot_36(ctx) {
    	let input;
    	let current;
    	input = new Input({ props: { id: "ton_unsubscribe_address" } });

    	return {
    		c() {
    			create_component(input.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(input, detaching);
    		}
    	};
    }

    // (764:14) <Button success on:click={ton_unsubscribe}>
    function create_default_slot_35(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Unsubscribe by address");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (763:12) <Field>
    function create_default_slot_34(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_35] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*ton_unsubscribe*/ ctx[17]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (766:12) <Field>
    function create_default_slot_33(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "ton_unsubscribe_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (758:10) <Details>
    function create_default_slot_32(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				label: "Address",
    				$$slots: { default: [create_default_slot_36] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_34] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_33] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (759:12) 
    function create_summary_slot_4(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "ton_unsubscribe";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (488:8) <Col class="container_methods">
    function create_default_slot_31(ctx) {
    	let details0;
    	let t0;
    	let details1;
    	let t1;
    	let details2;
    	let t2;
    	let details3;
    	let t3;
    	let details4;
    	let t4;
    	let details5;
    	let t5;
    	let details6;
    	let t6;
    	let details7;
    	let t7;
    	let details8;
    	let t8;
    	let details9;
    	let t9;
    	let details10;
    	let t10;
    	let details11;
    	let t11;
    	let details12;
    	let t12;
    	let details13;
    	let t13;
    	let details14;
    	let t14;
    	let details15;
    	let current;

    	details0 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_19],
    					default: [create_default_slot_118]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details1 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_18],
    					default: [create_default_slot_114]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details2 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_17],
    					default: [create_default_slot_110]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details3 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_16],
    					default: [create_default_slot_106]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details4 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_15],
    					default: [create_default_slot_102]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details5 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_14],
    					default: [create_default_slot_94]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details6 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_13],
    					default: [create_default_slot_85]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details7 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_12],
    					default: [create_default_slot_80]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details8 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_11],
    					default: [create_default_slot_76]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details9 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_10],
    					default: [create_default_slot_71]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details10 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_9],
    					default: [create_default_slot_66]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details11 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_8],
    					default: [create_default_slot_59]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details12 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_7],
    					default: [create_default_slot_52]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details13 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_6],
    					default: [create_default_slot_42]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details14 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_5],
    					default: [create_default_slot_37]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details15 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_4],
    					default: [create_default_slot_32]
    				},
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(details0.$$.fragment);
    			t0 = space();
    			create_component(details1.$$.fragment);
    			t1 = space();
    			create_component(details2.$$.fragment);
    			t2 = space();
    			create_component(details3.$$.fragment);
    			t3 = space();
    			create_component(details4.$$.fragment);
    			t4 = space();
    			create_component(details5.$$.fragment);
    			t5 = space();
    			create_component(details6.$$.fragment);
    			t6 = space();
    			create_component(details7.$$.fragment);
    			t7 = space();
    			create_component(details8.$$.fragment);
    			t8 = space();
    			create_component(details9.$$.fragment);
    			t9 = space();
    			create_component(details10.$$.fragment);
    			t10 = space();
    			create_component(details11.$$.fragment);
    			t11 = space();
    			create_component(details12.$$.fragment);
    			t12 = space();
    			create_component(details13.$$.fragment);
    			t13 = space();
    			create_component(details14.$$.fragment);
    			t14 = space();
    			create_component(details15.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(details0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(details1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(details2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(details3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(details4, target, anchor);
    			insert(target, t4, anchor);
    			mount_component(details5, target, anchor);
    			insert(target, t5, anchor);
    			mount_component(details6, target, anchor);
    			insert(target, t6, anchor);
    			mount_component(details7, target, anchor);
    			insert(target, t7, anchor);
    			mount_component(details8, target, anchor);
    			insert(target, t8, anchor);
    			mount_component(details9, target, anchor);
    			insert(target, t9, anchor);
    			mount_component(details10, target, anchor);
    			insert(target, t10, anchor);
    			mount_component(details11, target, anchor);
    			insert(target, t11, anchor);
    			mount_component(details12, target, anchor);
    			insert(target, t12, anchor);
    			mount_component(details13, target, anchor);
    			insert(target, t13, anchor);
    			mount_component(details14, target, anchor);
    			insert(target, t14, anchor);
    			mount_component(details15, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const details0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details0_changes.$$scope = { dirty, ctx };
    			}

    			details0.$set(details0_changes);
    			const details1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details1_changes.$$scope = { dirty, ctx };
    			}

    			details1.$set(details1_changes);
    			const details2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details2_changes.$$scope = { dirty, ctx };
    			}

    			details2.$set(details2_changes);
    			const details3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details3_changes.$$scope = { dirty, ctx };
    			}

    			details3.$set(details3_changes);
    			const details4_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details4_changes.$$scope = { dirty, ctx };
    			}

    			details4.$set(details4_changes);
    			const details5_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details5_changes.$$scope = { dirty, ctx };
    			}

    			details5.$set(details5_changes);
    			const details6_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details6_changes.$$scope = { dirty, ctx };
    			}

    			details6.$set(details6_changes);
    			const details7_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details7_changes.$$scope = { dirty, ctx };
    			}

    			details7.$set(details7_changes);
    			const details8_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details8_changes.$$scope = { dirty, ctx };
    			}

    			details8.$set(details8_changes);
    			const details9_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details9_changes.$$scope = { dirty, ctx };
    			}

    			details9.$set(details9_changes);
    			const details10_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details10_changes.$$scope = { dirty, ctx };
    			}

    			details10.$set(details10_changes);
    			const details11_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details11_changes.$$scope = { dirty, ctx };
    			}

    			details11.$set(details11_changes);
    			const details12_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details12_changes.$$scope = { dirty, ctx };
    			}

    			details12.$set(details12_changes);
    			const details13_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details13_changes.$$scope = { dirty, ctx };
    			}

    			details13.$set(details13_changes);
    			const details14_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details14_changes.$$scope = { dirty, ctx };
    			}

    			details14.$set(details14_changes);
    			const details15_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details15_changes.$$scope = { dirty, ctx };
    			}

    			details15.$set(details15_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(details0.$$.fragment, local);
    			transition_in(details1.$$.fragment, local);
    			transition_in(details2.$$.fragment, local);
    			transition_in(details3.$$.fragment, local);
    			transition_in(details4.$$.fragment, local);
    			transition_in(details5.$$.fragment, local);
    			transition_in(details6.$$.fragment, local);
    			transition_in(details7.$$.fragment, local);
    			transition_in(details8.$$.fragment, local);
    			transition_in(details9.$$.fragment, local);
    			transition_in(details10.$$.fragment, local);
    			transition_in(details11.$$.fragment, local);
    			transition_in(details12.$$.fragment, local);
    			transition_in(details13.$$.fragment, local);
    			transition_in(details14.$$.fragment, local);
    			transition_in(details15.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(details0.$$.fragment, local);
    			transition_out(details1.$$.fragment, local);
    			transition_out(details2.$$.fragment, local);
    			transition_out(details3.$$.fragment, local);
    			transition_out(details4.$$.fragment, local);
    			transition_out(details5.$$.fragment, local);
    			transition_out(details6.$$.fragment, local);
    			transition_out(details7.$$.fragment, local);
    			transition_out(details8.$$.fragment, local);
    			transition_out(details9.$$.fragment, local);
    			transition_out(details10.$$.fragment, local);
    			transition_out(details11.$$.fragment, local);
    			transition_out(details12.$$.fragment, local);
    			transition_out(details13.$$.fragment, local);
    			transition_out(details14.$$.fragment, local);
    			transition_out(details15.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(details0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(details1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(details2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(details3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(details4, detaching);
    			if (detaching) detach(t4);
    			destroy_component(details5, detaching);
    			if (detaching) detach(t5);
    			destroy_component(details6, detaching);
    			if (detaching) detach(t6);
    			destroy_component(details7, detaching);
    			if (detaching) detach(t7);
    			destroy_component(details8, detaching);
    			if (detaching) detach(t8);
    			destroy_component(details9, detaching);
    			if (detaching) detach(t9);
    			destroy_component(details10, detaching);
    			if (detaching) detach(t10);
    			destroy_component(details11, detaching);
    			if (detaching) detach(t11);
    			destroy_component(details12, detaching);
    			if (detaching) detach(t12);
    			destroy_component(details13, detaching);
    			if (detaching) detach(t13);
    			destroy_component(details14, detaching);
    			if (detaching) detach(t14);
    			destroy_component(details15, detaching);
    		}
    	};
    }

    // (776:14) <Button success on:click={enable_listening_message}>
    function create_default_slot_30(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Enable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (775:12) <Field>
    function create_default_slot_29(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_30] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*enable_listening_message*/ ctx[18]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (779:14) <Button success on:click={disable_listening_message}>
    function create_default_slot_28(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Disable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (778:12) <Field>
    function create_default_slot_27(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_28] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*disable_listening_message*/ ctx[19]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (781:12) <Field>
    function create_default_slot_26(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "listening_message_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (773:10) <Details>
    function create_default_slot_25(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_29] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_27] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_26] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (774:12) 
    function create_summary_slot_3(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "Listen events \"message\"";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (789:14) <Button success on:click={enable_listening_endpointChanged}>
    function create_default_slot_24(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Enable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (788:12) <Field>
    function create_default_slot_23(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_24] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*enable_listening_endpointChanged*/ ctx[20]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (792:14) <Button success on:click={disable_listening_endpointChanged}>
    function create_default_slot_22(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Disable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (791:12) <Field>
    function create_default_slot_21(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_22] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*disable_listening_endpointChanged*/ ctx[21]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (794:12) <Field>
    function create_default_slot_20(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "listening_endpointChanged_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (786:10) <Details>
    function create_default_slot_19(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_23] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_21] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_20] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (787:12) 
    function create_summary_slot_2(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "Listen events \"endpointChanged\"";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (802:14) <Button success on:click={enable_listening_unlockStateChanged}>
    function create_default_slot_18(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Enable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (801:12) <Field>
    function create_default_slot_17(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*enable_listening_unlockStateChanged*/ ctx[22]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (805:14) <Button success on:click={disable_listening_unlockStateChanged}>
    function create_default_slot_16(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Disable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (804:12) <Field>
    function create_default_slot_15(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*disable_listening_unlockStateChanged*/ ctx[23]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (807:12) <Field>
    function create_default_slot_14(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "listening_unlockStateChanged_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (799:10) <Details>
    function create_default_slot_13(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (800:12) 
    function create_summary_slot_1(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "Listen events \"unlockStateChanged\"";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (815:14) <Button success on:click={enable_listening_accountChanged}>
    function create_default_slot_12(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Enable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (814:12) <Field>
    function create_default_slot_11(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*enable_listening_accountChanged*/ ctx[24]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (818:14) <Button success on:click={disable_listening_accountChanged}>
    function create_default_slot_10(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Disable listening");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (817:12) <Field>
    function create_default_slot_9(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				success: true,
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", /*disable_listening_accountChanged*/ ctx[25]);

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (820:12) <Field>
    function create_default_slot_8(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "break-all svelte-qpq4mu");
    			attr(div, "id", "listening_accountChanged_output");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (812:10) <Details>
    function create_default_slot_7(ctx) {
    	let field0;
    	let t0;
    	let field1;
    	let t1;
    	let field2;
    	let current;

    	field0 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			}
    		});

    	field1 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			}
    		});

    	field2 = new Field({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(field0.$$.fragment);
    			t0 = space();
    			create_component(field1.$$.fragment);
    			t1 = space();
    			create_component(field2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(field0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(field1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(field2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const field0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field0_changes.$$scope = { dirty, ctx };
    			}

    			field0.$set(field0_changes);
    			const field1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field1_changes.$$scope = { dirty, ctx };
    			}

    			field1.$set(field1_changes);
    			const field2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				field2_changes.$$scope = { dirty, ctx };
    			}

    			field2.$set(field2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(field0.$$.fragment, local);
    			transition_in(field1.$$.fragment, local);
    			transition_in(field2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(field0.$$.fragment, local);
    			transition_out(field1.$$.fragment, local);
    			transition_out(field2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(field0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(field1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(field2, detaching);
    		}
    	};
    }

    // (813:12) 
    function create_summary_slot(ctx) {
    	let span;

    	return {
    		c() {
    			span = element("span");
    			span.textContent = "Listen events \"accountChanged\"";
    			attr(span, "slot", "summary");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (772:8) <Col>
    function create_default_slot_6(ctx) {
    	let details0;
    	let t0;
    	let details1;
    	let t1;
    	let details2;
    	let t2;
    	let details3;
    	let current;

    	details0 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_3],
    					default: [create_default_slot_25]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details1 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_2],
    					default: [create_default_slot_19]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details2 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot_1],
    					default: [create_default_slot_13]
    				},
    				$$scope: { ctx }
    			}
    		});

    	details3 = new Details({
    			props: {
    				$$slots: {
    					summary: [create_summary_slot],
    					default: [create_default_slot_7]
    				},
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(details0.$$.fragment);
    			t0 = space();
    			create_component(details1.$$.fragment);
    			t1 = space();
    			create_component(details2.$$.fragment);
    			t2 = space();
    			create_component(details3.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(details0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(details1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(details2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(details3, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const details0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details0_changes.$$scope = { dirty, ctx };
    			}

    			details0.$set(details0_changes);
    			const details1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details1_changes.$$scope = { dirty, ctx };
    			}

    			details1.$set(details1_changes);
    			const details2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details2_changes.$$scope = { dirty, ctx };
    			}

    			details2.$set(details2_changes);
    			const details3_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				details3_changes.$$scope = { dirty, ctx };
    			}

    			details3.$set(details3_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(details0.$$.fragment, local);
    			transition_in(details1.$$.fragment, local);
    			transition_in(details2.$$.fragment, local);
    			transition_in(details3.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(details0.$$.fragment, local);
    			transition_out(details1.$$.fragment, local);
    			transition_out(details2.$$.fragment, local);
    			transition_out(details3.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(details0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(details1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(details2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(details3, detaching);
    		}
    	};
    }

    // (487:6) <Row>
    function create_default_slot_5(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new Col({
    			props: {
    				class: "container_methods",
    				$$slots: { default: [create_default_slot_31] },
    				$$scope: { ctx }
    			}
    		});

    	col1 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach(t);
    			destroy_component(col1, detaching);
    		}
    	};
    }

    // (829:8) <Col size="2" class="is-center">
    function create_default_slot_4(ctx) {
    	let t0;
    	let t1_value = new Date().getFullYear() + "";
    	let t1;

    	return {
    		c() {
    			t0 = text("2021-");
    			t1 = text(t1_value);
    		},
    		m(target, anchor) {
    			insert(target, t0, anchor);
    			insert(target, t1, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(t0);
    			if (detaching) detach(t1);
    		}
    	};
    }

    // (830:8) <Col size="8" class="is-center">
    function create_default_slot_3(ctx) {
    	let t0_value = 'Made by' + "";
    	let t0;
    	let t1;
    	let a;
    	let t3;
    	let t4_value = 'with' + "";
    	let t4;
    	let t5;

    	return {
    		c() {
    			t0 = text(t0_value);
    			t1 = text("\n           ");
    			a = element("a");
    			a.textContent = `${'XTON wallet team'}`;
    			t3 = text(" \n          ");
    			t4 = text(t4_value);
    			t5 = text("\n          ❤️");
    			attr(a, "target", "_blank");
    			attr(a, "class", "footer-made");
    			attr(a, "href", "#");
    		},
    		m(target, anchor) {
    			insert(target, t0, anchor);
    			insert(target, t1, anchor);
    			insert(target, a, anchor);
    			insert(target, t3, anchor);
    			insert(target, t4, anchor);
    			insert(target, t5, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(t0);
    			if (detaching) detach(t1);
    			if (detaching) detach(a);
    			if (detaching) detach(t3);
    			if (detaching) detach(t4);
    			if (detaching) detach(t5);
    		}
    	};
    }

    // (839:8) <Col size="2" class="is-center">
    function create_default_slot_2(ctx) {
    	let a;

    	return {
    		c() {
    			a = element("a");
    			a.textContent = `${'Support'}`;
    			attr(a, "href", "/");
    		},
    		m(target, anchor) {
    			insert(target, a, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(a);
    		}
    	};
    }

    // (828:6) <Row class="is-center footer">
    function create_default_slot_1(ctx) {
    	let col0;
    	let t0;
    	let col1;
    	let t1;
    	let col2;
    	let current;

    	col0 = new Col({
    			props: {
    				size: "2",
    				class: "is-center",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			}
    		});

    	col1 = new Col({
    			props: {
    				size: "8",
    				class: "is-center",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			}
    		});

    	col2 = new Col({
    			props: {
    				size: "2",
    				class: "is-center",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(col0.$$.fragment);
    			t0 = space();
    			create_component(col1.$$.fragment);
    			t1 = space();
    			create_component(col2.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(col1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(col2, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    			const col2_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				col2_changes.$$scope = { dirty, ctx };
    			}

    			col2.$set(col2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			transition_in(col2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			transition_out(col2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(col1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(col2, detaching);
    		}
    	};
    }

    // (827:4) <Container>
    function create_default_slot(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				class: "is-center footer",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(row.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope*/ 134217728) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(row, detaching);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let nav;
    	let t3;
    	let div3;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$loaded*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			nav = element("nav");

    			nav.innerHTML = `<div class="nav-left"><a href="https://xtonwallet.com" class="brand svelte-qpq4mu"><img alt="XTON wallet" title="XTON wallet" src="/assets/img/icon-128.png" class="svelte-qpq4mu"/></a></div> 
  <div class="nav-center"><h4 class="text-center">Demo page to test a browser wallet extension on TEPs-100 compatibility</h4></div> 
  <div class="nav-right"></div>`;

    			t3 = space();
    			div3 = element("div");
    			if_block.c();
    			attr(nav, "class", "nav");
    			attr(div3, "class", "container svelte-qpq4mu");
    		},
    		m(target, anchor) {
    			insert(target, nav, anchor);
    			insert(target, t3, anchor);
    			insert(target, div3, anchor);
    			if_blocks[current_block_type_index].m(div3, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div3, null);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(nav);
    			if (detaching) detach(t3);
    			if (detaching) detach(div3);
    			if_blocks[current_block_type_index].d();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let $loaded,
    		$$unsubscribe_loaded = noop,
    		$$subscribe_loaded = () => ($$unsubscribe_loaded(), $$unsubscribe_loaded = subscribe(loaded, $$value => $$invalidate(1, $loaded = $$value)), loaded);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_loaded());
    	let { loaded } = $$props;
    	$$subscribe_loaded();

    	const allPermissions = [
    		"ton_account",
    		"ton_endpoint",
    		"ton_sendTransaction",
    		"ton_sendRawTransaction",
    		"ton_signMessage",
    		"ton_getSignature",
    		"ton_subscribe",
    		"ton_unsubscribe",
    		"ton_getNaclBoxPublicKey",
    		"ton_encryptMessage",
    		"ton_decryptMessage",
    		"wallet_watchAsset"
    	];

    	const wallet_getSdkVersion = event => {
    		const wallet_getSdkVersion_output = document.getElementById("wallet_getSdkVersion_output");

    		window.ton.request({
    			method: "wallet_getSdkVersion",
    			params: {}
    		}).then(result => {
    			wallet_getSdkVersion_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			wallet_getSdkVersion_output.innerText = JSON.stringify(result);
    		});
    	};

    	const wallet_requestPermissions = event => {
    		const wallet_requestPermissions_output = document.getElementById("wallet_requestPermissions_output");

    		window.ton.request({
    			method: "wallet_requestPermissions",
    			params: { permissions: allPermissions }
    		}).then(result => {
    			wallet_requestPermissions_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			wallet_requestPermissions_output.innerText = JSON.stringify(result);
    		});
    	};

    	const wallet_getPermissions = async event => {
    		const wallet_getPermissions_output = document.getElementById("wallet_getPermissions_output");

    		window.ton.request({
    			method: "wallet_getPermissions",
    			params: {}
    		}).then(result => {
    			wallet_getPermissions_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			wallet_getPermissions_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_account = event => {
    		const ton_account_output = document.getElementById("ton_account_output");

    		window.ton.request({ method: "ton_account", params: {} }).then(result => {
    			ton_account_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_account_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_endpoint = event => {
    		const ton_endpoint_output = document.getElementById("ton_endpoint_output");

    		window.ton.request({ method: "ton_endpoint", params: {} }).then(result => {
    			ton_endpoint_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_endpoint_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_sendTransaction = event => {
    		const ton_sendTransaction_output = document.getElementById("ton_sendTransaction_output");

    		window.ton.request({
    			method: "ton_sendTransaction",
    			params: {
    				token: document.getElementById("ton_sendTransaction_token").value,
    				destination: document.getElementById("ton_sendTransaction_destination").value,
    				amount: Number(document.getElementById("ton_sendTransaction_amount").value).valueOf(),
    				message: document.getElementById("ton_sendTransaction_message").value
    			}
    		}).then(result => {
    			ton_sendTransaction_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_sendTransaction_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_sendRawTransaction = event => {
    		const ton_sendRawTransaction_output = document.getElementById("ton_sendRawTransaction_output");

    		window.ton.request({
    			method: "ton_sendRawTransaction",
    			params: {
    				to: document.getElementById("ton_sendRawTransaction_to").value,
    				amount: Number(document.getElementById("ton_sendRawTransaction_amount").value).valueOf(),
    				data: document.getElementById("ton_sendRawTransaction_data").value,
    				dataType: document.getElementById("ton_sendRawTransaction_dataType").value,
    				stateInit: document.getElementById("ton_sendRawTransaction_stateInit").value
    			}
    		}).then(result => {
    			ton_sendRawTransaction_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_sendRawTransaction_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_signMessage = event => {
    		const ton_signMessage_output = document.getElementById("ton_signMessage_output");

    		window.ton.request({
    			method: "ton_signMessage",
    			params: {
    				data: document.getElementById("ton_signMessage_data").value
    			}
    		}).then(result => {
    			ton_signMessage_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_signMessage_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_getNaclBoxPublicKey = event => {
    		const ton_getNaclBoxPublicKey_output = document.getElementById("ton_getNaclBoxPublicKey_output");

    		window.ton.request({
    			method: "ton_getNaclBoxPublicKey",
    			params: {}
    		}).then(result => {
    			ton_getNaclBoxPublicKey_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_getNaclBoxPublicKey_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_getSignature = event => {
    		const ton_getSignature_output = document.getElementById("ton_getSignature_output");

    		window.ton.request({
    			method: "ton_getSignature",
    			params: {
    				data: document.getElementById("ton_getSignature_data").value
    			}
    		}).then(result => {
    			ton_getSignature_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_getSignature_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_crypto_generate_random_bytes = event => {
    		const ton_crypto_generate_random_bytes_output = document.getElementById("ton_crypto_generate_random_bytes_output");

    		window.ton.request({
    			method: "ton_crypto_generate_random_bytes",
    			params: {
    				length: Number(document.getElementById("ton_crypto_generate_random_bytes_length").value).valueOf()
    			}
    		}).then(result => {
    			ton_crypto_generate_random_bytes_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_crypto_generate_random_bytes_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_encryptMessage = event => {
    		const ton_encryptMessage_output = document.getElementById("ton_encryptMessage_output");

    		window.ton.request({
    			method: "ton_encryptMessage",
    			params: {
    				decrypted: document.getElementById("ton_encryptMessage_decrypted").value,
    				nonce: document.getElementById("ton_encryptMessage_nonce").value,
    				their_public: document.getElementById("ton_encryptMessage_their_public").value
    			}
    		}).then(result => {
    			ton_encryptMessage_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_encryptMessage_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_decryptMessage = event => {
    		const ton_decryptMessage_output = document.getElementById("ton_decryptMessage_output");

    		window.ton.request({
    			method: "ton_decryptMessage",
    			params: {
    				encrypted: document.getElementById("ton_decryptMessage_encrypted").value,
    				nonce: document.getElementById("ton_decryptMessage_nonce").value,
    				their_public: document.getElementById("ton_decryptMessage_their_public").value
    			}
    		}).then(result => {
    			ton_decryptMessage_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_decryptMessage_output.innerText = JSON.stringify(result);
    		});
    	};

    	const wallet_watchAsset = event => {
    		const wallet_watchAsset_output = document.getElementById("wallet_watchAsset_output");

    		window.ton.request({
    			method: "wallet_watchAsset",
    			params: {
    				name: document.getElementById("wallet_watchAsset_name").value,
    				symbol: document.getElementById("wallet_watchAsset_symbol").value,
    				decimals: Number(document.getElementById("wallet_watchAsset_decimals").value).valueOf(),
    				address: document.getElementById("wallet_watchAsset_address").value,
    				icon: document.getElementById("wallet_watchAsset_icon").value,
    				type: document.getElementById("wallet_watchAsset_type").value
    			}
    		}).then(result => {
    			wallet_watchAsset_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			wallet_watchAsset_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_subscribe = event => {
    		const ton_subscribe_output = document.getElementById("ton_subscribe_output");

    		window.ton.request({
    			method: "ton_subscribe",
    			params: {
    				address: document.getElementById("ton_subscribe_address").value
    			}
    		}).then(result => {
    			ton_subscribe_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_subscribe_output.innerText = JSON.stringify(result);
    		});
    	};

    	const ton_unsubscribe = event => {
    		const ton_unsubscribe_output = document.getElementById("ton_unsubscribe_output");

    		window.ton.request({
    			method: "ton_unsubscribe",
    			params: {
    				address: document.getElementById("ton_unsubscribe_address").value
    			}
    		}).then(result => {
    			ton_unsubscribe_output.innerText = JSON.stringify(result);
    		}).catch(result => {
    			ton_unsubscribe_output.innerText = JSON.stringify(result);
    		});
    	};

    	const enable_listening_message = event => {
    		const listening_message_output = document.getElementById("listening_message_output");

    		window.ton.on("message", function (event) {
    			listening_message_output.innerText += JSON.stringify(event) + "\n";
    		});
    	};

    	const disable_listening_message = event => {
    		const listening_message_output = document.getElementById("listening_message_output");
    		window.ton.off("message");
    		listening_message_output.innerText = '';
    	};

    	const enable_listening_endpointChanged = event => {
    		const listening_endpointChanged_output = document.getElementById("listening_endpointChanged_output");

    		window.ton.on("endpointChanged", function (event) {
    			listening_endpointChanged_output.innerText += JSON.stringify(event) + "\n";
    		});
    	};

    	const disable_listening_endpointChanged = event => {
    		const listening_endpointChanged_output = document.getElementById("listening_endpointChanged_output");
    		window.ton.off("endpointChanged");
    		listening_endpointChanged_output.innerText = '';
    	};

    	const enable_listening_unlockStateChanged = event => {
    		const listening_unlockStateChanged_output = document.getElementById("listening_unlockStateChanged_output");

    		window.ton.on("unlockStateChanged", function (event) {
    			listening_unlockStateChanged_output.innerText += JSON.stringify(event) + "\n";
    		});
    	};

    	const disable_listening_unlockStateChanged = event => {
    		const listening_unlockStateChanged_output = document.getElementById("listening_unlockStateChanged_output");
    		window.ton.off("unlockStateChanged");
    		listening_unlockStateChanged_output.innerText = '';
    	};

    	const enable_listening_accountChanged = event => {
    		const listening_accountChanged_output = document.getElementById("listening_accountChanged_output");

    		window.ton.on("accountChanged", function (event) {
    			listening_accountChanged_output.innerText += JSON.stringify(event) + "\n";
    		});
    	};

    	const disable_listening_accountChanged = event => {
    		const listening_accountChanged_output = document.getElementById("listening_accountChanged_output");
    		window.ton.off("accountChanged");
    		listening_accountChanged_output.innerText = '';
    	};

    	$$self.$$set = $$props => {
    		if ('loaded' in $$props) $$subscribe_loaded($$invalidate(0, loaded = $$props.loaded));
    	};

    	return [
    		loaded,
    		$loaded,
    		wallet_getSdkVersion,
    		wallet_requestPermissions,
    		wallet_getPermissions,
    		ton_account,
    		ton_endpoint,
    		ton_sendTransaction,
    		ton_sendRawTransaction,
    		ton_signMessage,
    		ton_getNaclBoxPublicKey,
    		ton_getSignature,
    		ton_crypto_generate_random_bytes,
    		ton_encryptMessage,
    		ton_decryptMessage,
    		wallet_watchAsset,
    		ton_subscribe,
    		ton_unsubscribe,
    		enable_listening_message,
    		disable_listening_message,
    		enable_listening_endpointChanged,
    		disable_listening_endpointChanged,
    		enable_listening_unlockStateChanged,
    		disable_listening_unlockStateChanged,
    		enable_listening_accountChanged,
    		disable_listening_accountChanged
    	];
    }

    class DemoPage extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, { loaded: 0 });
    	}
    }

    const loaded = writable(false);

    window.addEventListener('load', () => {
      try{
        loaded.set(true);
      } catch (e) {
        console.log(e);
      }
    });

    new DemoPage({
      target: document.body,
      props: {loaded}
    });

})();
