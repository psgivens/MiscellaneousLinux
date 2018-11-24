

----


h2. *PL-1*: SECURITY PLANNING POLICY AND PROCEDURES

This control addresses the establishment of policy and procedures for the effective implementation of selected security controls and control enhancements in the PL family. Policy and procedures reflect applicable federal laws, Executive Orders, directives, regulations, policies, standards, and guidance. Security program policies and procedures at the organization level may make the need for system-specific policies and procedures unnecessary. The policy can be included as part of the general information security policy for organizations or conversely, can be represented by multiple policies reflecting the complex nature of certain organizations. The procedures can be established for the security program in general and for particular information systems, if needed. The organizational risk management strategy is a key factor in establishing policy and procedures.


h3. The organization:

* *PL-1a.*: Develops, documents, and disseminates to [Assignment: organization-defined personnel or roles]:
** *PL-1a.1.*: A security planning policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and
** *PL-1a.2.*: Procedures to facilitate the implementation of the security planning policy and associated security planning controls; and
* *PL-1b.*: Reviews and updates the current:
** *PL-1b.1.*: Security planning policy [Assignment: organization-defined frequency]; and
** *PL-1b.2.*: Security planning procedures [Assignment: organization-defined frequency].


----


h2. *PL-2*: SYSTEM SECURITY PLAN

Security plans relate security requirements to a set of security controls and control enhancements. Security plans also describe, at a high level, how the security controls and control enhancements meet those security requirements, but do not provide detailed, technical descriptions of the specific design or implementation of the controls/enhancements. Security plans contain sufficient information (including the specification of parameter values for assignment and selection statements either explicitly or by reference) to enable a design and implementation that is unambiguously compliant with the intent of the plans and subsequent determinations of risk to organizational operations and assets, individuals, other organizations, and the Nation if the plan is implemented as intended. Organizations can also apply tailoring guidance to the security control baselines in Appendix D and CNSS Instruction 1253 to develop overlays for community-wide use or to address specialized requirements, technologies, or missions/environments of operation (e.g., DoD-tactical, Federal Public Key Infrastructure, or Federal Identity, Credential, and Access Management, space operations). Appendix I provides guidance on developing overlays.
Security plans need not be single documents; the plans can be a collection of various documents including documents that already exist. Effective security plans make extensive use of references to policies, procedures, and additional documents (e.g., design and implementation specifications) where more detailed information can be obtained. This reduces the documentation requirements associated with security programs and maintains security-related information in other established management/operational areas related to enterprise architecture, system development life cycle, systems engineering, and acquisition. For example, security plans do not contain detailed contingency plan or incident response plan information but instead provide explicitly or by reference, sufficient information to define what needs to be accomplished by those plans.


h3. The organization:

* *PL-2a.*: Develops a security plan for the information system that:
** *PL-2a.1.*: Is consistent with the organization�s enterprise architecture;
** *PL-2a.2.*: Explicitly defines the authorization boundary for the system;
** *PL-2a.3.*: Describes the operational context of the information system in terms of missions and business processes;
** *PL-2a.4.*: Provides the security categorization of the information system including supporting rationale;
** *PL-2a.5.*: Describes the operational environment for the information system and relationships with or connections to other information systems;
** *PL-2a.6.*: Provides an overview of the security requirements for the system;
** *PL-2a.7.*: Identifies any relevant overlays, if applicable;
** *PL-2a.8.*: Describes the security controls in place or planned for meeting those requirements including a rationale for the tailoring decisions; and
** *PL-2a.9.*: Is reviewed and approved by the authorizing official or designated representative prior to plan implementation;
* *PL-2b.*: Distributes copies of the security plan and communicates subsequent changes to the plan to [Assignment: organization-defined personnel or roles];
* *PL-2c.*: Reviews the security plan for the information system [Assignment: organization-defined frequency];
* *PL-2d.*: Updates the plan to address changes to the information system/environment of operation or problems identified during plan implementation or security control assessments; and
* *PL-2e.*: Protects the security plan from unauthorized disclosure and modification.


----


h2. *PL-4*: RULES OF BEHAVIOR

This control enhancement applies to organizational users. Organizations consider rules of behavior based on individual user roles and responsibilities, differentiating, for example, between rules that apply to privileged users and rules that apply to general users. Establishing rules of behavior for some types of non-organizational users including, for example, individuals who simply receive data/information from federal information systems, is often not feasible given the large number of such users and the limited nature of their interactions with the systems. Rules of behavior for both organizational and non-organizational users can also be established in AC-8, System Use Notification. PL-4 b. (the signed acknowledgment portion of this control) may be satisfied by the security awareness training and role-based security training programs conducted by organizations if such training includes rules of behavior. Organizations can use electronic signatures for acknowledging rules of behavior.


h3. The organization:

* *PL-4a.*: Establishes and makes readily available to individuals requiring access to the information system, the rules that describe their responsibilities and expected behavior with regard to information and information system usage;
* *PL-4b.*: Receives a signed acknowledgment from such individuals, indicating that they have read, understand, and agree to abide by the rules of behavior, before authorizing access to information and the information system;
* *PL-4c.*: Reviews and updates the rules of behavior [Assignment: organization-defined frequency]; and
* *PL-4d.*: Requires individuals who have signed a previous version of the rules of behavior to read and re-sign when the rules of behavior are revised/updated.


----


h2. *PL-7*: SECURITY CONCEPT OF OPERATIONS

The security CONOPS may be included in the security plan for the information system or in other system development life cycle-related documents, as appropriate. Changes to the CONOPS are reflected in ongoing updates to the security plan, the information security architecture, and other appropriate organizational documents (e.g., security specifications for procurements/acquisitions, system development life cycle documents, and systems/security engineering documents).


h3. The organization:

* *PL-7a.*: Develops a security Concept of Operations (CONOPS) for the information system containing at a minimum, how the organization intends to operate the system from the perspective of information security; and
* *PL-7b.*: Reviews and updates the CONOPS [Assignment: organization-defined frequency].


----


h2. *PL-8*: INFORMATION SECURITY ARCHITECTURE

This control addresses actions taken by organizations in the design and development of information systems. The information security architecture at the individual information system level is consistent with and complements the more global, organization-wide information security architecture described in PM-7 that is integral to and developed as part of the enterprise architecture. The information security architecture includes an architectural description, the placement/allocation of security functionality (including security controls), security-related information for external interfaces, information being exchanged across the interfaces, and the protection mechanisms associated with each interface. In addition, the security architecture can include other important security-related information, for example, user roles and access privileges assigned to each role, unique security requirements, the types of information processed, stored, and transmitted by the information system, restoration priorities of information and information system services, and any other specific protection needs.
In today�s modern architecture, it is becoming less common for organizations to control all information resources. There are going to be key dependencies on external information services and service providers. Describing such dependencies in the information security architecture is important to developing a comprehensive mission/business protection strategy. Establishing, developing, documenting, and maintaining under configuration control, a baseline configuration for organizational information systems is critical to implementing and maintaining an effective information security architecture. The development of the information security architecture is coordinated with the Senior Agency Official for Privacy (SAOP)/Chief Privacy Officer (CPO) to ensure that security controls needed to support privacy requirements are identified and effectively implemented. PL-8 is primarily directed at organizations (i.e., internally focused) to help ensure that organizations develop an information security architecture for the information system, and that the security architecture is integrated with or tightly coupled to the enterprise architecture through the organization-wide information security architecture. In contrast, SA-17 is primarily directed at external information technology product/system developers and integrators (although SA-17 could be used internally within organizations for in-house system development). SA-17, which is complementary to PL-8, is selected when organizations outsource the development of information systems or information system components to external entities, and there is a need to demonstrate/show consistency with the organization�s enterprise architecture and information security architecture.


h3. The organization:

* *PL-8a.*: Develops an information security architecture for the information system that:
** *PL-8a.1.*: Describes the overall philosophy, requirements, and approach to be taken with regard to protecting the confidentiality, integrity, and availability of organizational information;
** *PL-8a.2.*: Describes how the information security architecture is integrated into and supports the enterprise architecture; and
** *PL-8a.3.*: Describes any information security assumptions about, and dependencies on, external services;
* *PL-8b.*: Reviews and updates the information security architecture [Assignment: organization-defined frequency] to reflect updates in the enterprise architecture; and
* *PL-8c.*: Ensures that planned information security architecture changes are reflected in the security plan, the security Concept of Operations (CONOPS), and organizational procurements/acquisitions.


----


h2. *PL-9*: CENTRAL MANAGEMENT

Central management refers to the organization-wide management and implementation of selected security controls and related processes. Central management includes planning, implementing, assessing, authorizing, and monitoring the organization-defined, centrally managed security controls and processes. As central management of security controls is generally associated with common controls, such management promotes and facilitates standardization of security control implementations and management and judicious use of organizational resources.  Centrally-managed security controls and processes may also meet independence requirements for assessments in support of initial and ongoing authorizations to operate as part of organizational continuous monitoring. As part of the security control selection process, organizations determine which controls may be suitable for central management based on organizational resources and capabilities. Organizations consider that it may not always be possible to centrally manage every aspect of a security control. In such cases, the security control is treated as a hybrid control with the control managed and implemented either centrally or at the information system level. Controls and control enhancements that are candidates for full or partial central management include, but are not limited to: AC-2 (1) (2) (3) (4); AC-17 (1) (2) (3) (9); AC-18 (1) (3) (4) (5); AC-19 (4); AC-22; AC-23; AT-2 (1) (2); AT-3 (1) (2) (3); AT-4; AU-6 (1) (3) (5) (6) (9); AU-7 (1) (2); AU-11, AU-13, AU-16, CA-2 (1) (2) (3); CA-3 (1) (2) (3); CA-7 (1); CA-9; CM-2 (1) (2); CM-3 (1) (4); CM-4; CM-6 (1); CM-7 (4) (5); CM-8 (all); CM-9 (1); CM-10; CM-11; CP-7 (all); CP-8 (all); SC-43; SI-2; SI-3; SI-7; and SI-8.


h3. The organization centrally manages [Assignment: organization-defined security controls and related processes].

