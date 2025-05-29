import frappe

from frappe.website.path_resolver import resolve_path as original_resolve_path

def path_resolver(path: str):
    # frappe.redirect("https://google.com")
    return original_resolve_path(path)