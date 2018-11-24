

----


h2. *MA-1*: SYSTEM MAINTENANCE POLICY AND PROCEDURES

This control addresses the establishment of policy and procedures for the effective implementation of selected security controls and control enhancements in the MA family. Policy and procedures reflect applicable federal laws, Executive Orders, directives, regulations, policies, standards, and guidance. Security program policies and procedures at the organization level may make the need for system-specific policies and procedures unnecessary. The policy can be included as part of the general information security policy for organizations or conversely, can be represented by multiple policies reflecting the complex nature of certain organizations. The procedures can be established for the security program in general and for particular information systems, if needed. The organizational risk management strategy is a key factor in establishing policy and procedures.


h3. The organization:

* *MA-1a.*: Develops, documents, and disseminates to [Assignment: organization-defined personnel or roles]:
** *MA-1a.1.*: A system maintenance policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and
** *MA-1a.2.*: Procedures to facilitate the implementation of the system maintenance policy and associated system maintenance controls; and
* *MA-1b.*: Reviews and updates the current:
** *MA-1b.1.*: System maintenance policy [Assignment: organization-defined frequency]; and
** *MA-1b.2.*: System maintenance procedures [Assignment: organization-defined frequency].


----


h2. *MA-2*: CONTROLLED MAINTENANCE

This control addresses the information security aspects of the information system maintenance program and applies to all types of maintenance to any system component (including applications) conducted by any local or nonlocal entity (e.g., in-contract, warranty, in-house, software maintenance agreement). System maintenance also includes those components not directly associated with information processing and/or data/information retention such as scanners, copiers, and printers. Information necessary for creating effective maintenance records includes, for example: (i) date and time of maintenance; (ii) name of individuals or group performing the maintenance; (iii) name of escort, if necessary; (iv) a description of the maintenance performed; and (v) information system components/equipment removed or replaced (including identification numbers, if applicable). The level of detail included in maintenance records can be informed by the security categories of organizational information systems. Organizations consider supply chain issues associated with replacement components for information systems.


h3. The organization:

* *MA-2a.*: Schedules, performs, documents, and reviews records of maintenance and repairs on information system components in accordance with manufacturer or vendor specifications and/or organizational requirements;
* *MA-2b.*: Approves and monitors all maintenance activities, whether performed on site or remotely and whether the equipment is serviced on site or removed to another location;
* *MA-2c.*: Requires that [Assignment: organization-defined personnel or roles] explicitly approve the removal of the information system or system components from organizational facilities for off-site maintenance or repairs;
* *MA-2d.*: Sanitizes equipment to remove all information from associated media prior to removal from organizational facilities for off-site maintenance or repairs;
* *MA-2e.*: Checks all potentially impacted security controls to verify that the controls are still functioning properly following maintenance or repair actions; and
* *MA-2f.*: Includes [Assignment: organization-defined maintenance-related information] in organizational maintenance records.


----


h2. *MA-3*: MAINTENANCE TOOLS

This control addresses security-related issues associated with maintenance tools used specifically for diagnostic and repair actions on organizational information systems. Maintenance tools can include hardware, software, and firmware items. Maintenance tools are potential vehicles for transporting malicious code, either intentionally or unintentionally, into a facility and subsequently into organizational information systems. Maintenance tools can include, for example, hardware/software diagnostic test equipment and hardware/software packet sniffers. This control does not cover hardware/software components that may support information system maintenance, yet are a part of the system, for example, the software implementing �ping,� �ls,� �ipconfig,� or the hardware and software implementing the monitoring port of an Ethernet switch.


h3. The organization approves, controls, and monitors information system maintenance tools.



----


h2. *MA-4*: NONLOCAL MAINTENANCE

Nonlocal maintenance and diagnostic activities are those activities conducted by individuals communicating through a network, either an external network (e.g., the Internet) or an internal network. Local maintenance and diagnostic activities are those activities carried out by individuals physically present at the information system or information system component and not communicating across a network connection. Authentication techniques used in the establishment of nonlocal maintenance and diagnostic sessions reflect the network access requirements in IA-2. Typically, strong authentication requires authenticators that are resistant to replay attacks and employ multifactor authentication. Strong authenticators include, for example, PKI where certificates are stored on a token protected by a password, passphrase, or biometric. Enforcing requirements in MA-4 is accomplished in part by other controls.


h3. The organization:

* *MA-4a.*: Approves and monitors nonlocal maintenance and diagnostic activities;
* *MA-4b.*: Allows the use of nonlocal maintenance and diagnostic tools only as consistent with organizational policy and documented in the security plan for the information system;
* *MA-4c.*: Employs strong authenticators in the establishment of nonlocal maintenance and diagnostic sessions;
* *MA-4d.*: Maintains records for nonlocal maintenance and diagnostic activities; and
* *MA-4e.*: Terminates session and network connections when nonlocal maintenance is completed.


----


h2. *MA-5*: MAINTENANCE PERSONNEL

This control applies to individuals performing hardware or software maintenance on organizational information systems, while PE-2 addresses physical access for individuals whose maintenance duties place them within the physical protection perimeter of the systems (e.g., custodial staff, physical plant maintenance personnel). Technical competence of supervising individuals relates to the maintenance performed on the information systems while having required access authorizations refers to maintenance on and near the systems. Individuals not previously identified as authorized maintenance personnel, such as information technology manufacturers, vendors, systems integrators, and consultants, may require privileged access to organizational information systems, for example, when required to conduct maintenance activities with little or no notice. Based on organizational assessments of risk, organizations may issue temporary credentials to these individuals. Temporary credentials may be for one-time use or for very limited time periods.


h3. The organization:

* *MA-5a.*: Establishes a process for maintenance personnel authorization and maintains a list of authorized maintenance organizations or personnel;
* *MA-5b.*: Ensures that non-escorted personnel performing maintenance on the information system have required access authorizations; and
* *MA-5c.*: Designates organizational personnel with required access authorizations and technical competence to supervise the maintenance activities of personnel who do not possess the required access authorizations.


----


h2. *MA-6*: TIMELY MAINTENANCE

Organizations specify the information system components that result in increased risk to organizational operations and assets, individuals, other organizations, or the Nation when the functionality provided by those components is not operational. Organizational actions to obtain maintenance support typically include having appropriate contracts in place.


h3. The organization obtains maintenance support and/or spare parts for [Assignment: organization-defined information system components] within [Assignment: organization-defined time period] of failure.

